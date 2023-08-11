import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import EditorContainer from "../components/EditorContainer";
import { useCodesContentContext } from "../context";
import { CODE_SAMPLES } from "../data/code";
import {
  CodeEditorsPaneProps,
  CodeSampleProps,
  LANGUAGES,
} from "../interfaces";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow: auto;
`;

function getLanguageSetup(
  lang: keyof typeof LANGUAGES
): CodeSampleProps | undefined {
  const match = CODE_SAMPLES.find((item) => lang === item.language);
  if (!match) return;
  const { language, label, getInitialCode } = match;

  return {
    language,
    label,
    getInitialCode,
  };
}

const CodeEditorsList = ({
  codesList,
  editorSettings,
}: CodeEditorsPaneProps): JSX.Element => {
  const { t } = useTranslation("translation", { keyPrefix: "codePanes" });
  const { handleUpdate: handleCodeUpdate } = useCodesContentContext();

  if (!codesList) return <h1>{t("errors.notFound")}</h1>;

  return (
    <>
      {codesList?.map((codeLang: CodeSampleProps) => {
        const codeObj = getLanguageSetup(codeLang.language);
        const instructions = t(`instructions.${codeLang.language}`);
        const [content, setContent] = useState(
          codeObj?.getInitialCode(instructions) || ""
        );

        const handleUpdate = useCallback(
          (content: string, language: keyof typeof LANGUAGES) => {
            setContent(content);
            handleCodeUpdate(content, language);
          },
          []
        );

        return (
          <EditorContainer
            key={codeLang.language}
            language={codeObj?.language}
            value={content}
            onChange={handleUpdate}
            displayName={codeObj?.label}
            editorSettings={editorSettings}
          />
        );
      })}
    </>
  );
};

const CodeEditorsPane: React.FC<CodeEditorsPaneProps> = ({
  codesList,
  editorSettings,
}) => {
  return (
    <StyledContainer>
      <CodeEditorsList codesList={codesList} editorSettings={editorSettings} />
    </StyledContainer>
  );
};

export default CodeEditorsPane;
