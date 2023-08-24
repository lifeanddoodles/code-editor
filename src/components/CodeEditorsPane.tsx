import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import EditorContainer from "../components/EditorContainer";
import { useCodesContentContext } from "../context";
import useResponsive from "../hooks/useResponsive";
import {
  CodeEditorsPaneProps,
  CodeSampleProps,
  LANGUAGES,
} from "../interfaces";
import { getLanguageSetup } from "../utils";
import EditorContainerMobile from "./EditorContainerMobile";
import TabList from "./TabList";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow: auto;
`;

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
        const [content, setContent] = useState("");

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

const CodeEditorsTabs = ({
  codesList,
  editorSettings,
}: CodeEditorsPaneProps): JSX.Element => {
  const { t } = useTranslation("translation", { keyPrefix: "codePanes" });
  const { handleUpdate: handleCodeUpdate } = useCodesContentContext();
  const [activeTab, setActiveTab] = useState("tab-HTML");

  if (!codesList) return <h1>{t("errors.notFound")}</h1>;

  return (
    <>
      {codesList && (
        <TabList
          codesList={codesList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
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
          <EditorContainerMobile
            key={codeLang.language}
            language={codeObj?.language}
            value={content}
            onChange={handleUpdate}
            id={`tabpanel-${codeObj?.language}`}
            editorSettings={editorSettings}
            ariaLabelledby={`tab-${codeObj?.language}`}
            isHidden={activeTab !== `tab-${codeObj?.language}`}
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
  const [isMobile] = useResponsive();

  return (
    <StyledContainer>
      {isMobile ? (
        <CodeEditorsTabs
          codesList={codesList}
          editorSettings={editorSettings}
        />
      ) : (
        <CodeEditorsList
          codesList={codesList}
          editorSettings={editorSettings}
        />
      )}
    </StyledContainer>
  );
};

export default CodeEditorsPane;
