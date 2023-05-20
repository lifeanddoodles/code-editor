import { useState } from 'react';
import styled from 'styled-components';
import EditorContainer from '../components/EditorContainer';
import { CODE_SAMPLES } from '../data/code';
import {
  CodeEditorsPaneProps,
  CodeSampleProps,
  LANGUAGES,
} from '../interfaces';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow: auto;
`;

function getLanguageSetup(
  lang: keyof typeof LANGUAGES,
): CodeSampleProps | undefined {
  const match = CODE_SAMPLES.find((item) => lang === item.language);
  if (!match) return;
  const { language, label, instructions, getInitialCode } = match;

  return {
    language,
    label,
    instructions,
    getInitialCode,
  };
}

const CodeEditorsList = ({
  codesList,
  editorSettings,
  uiLanguage,
  setHtml,
  setCss,
}: CodeEditorsPaneProps): JSX.Element => {
  const handleUpdate = (language: keyof typeof LANGUAGES, content: string) => {
    switch (language) {
      case LANGUAGES.CSS:
        setCss!(content);
        break;
      case LANGUAGES.HTML:
      default:
        setHtml!(content);
        break;
    }
  };
  if (!codesList) return <h1>Error: no code samples found</h1>;
  return (
    <>
      {codesList?.map((codeLang: CodeSampleProps) => {
        const codeObj = getLanguageSetup(codeLang.language);
        const [content, setContent] = useState(
          codeObj?.getInitialCode(codeObj?.instructions[uiLanguage]) || '',
        );
        return (
          <EditorContainer
            key={codeLang.language}
            language={codeObj?.language}
            value={content}
            onChange={setContent}
            displayName={codeObj?.label}
            editorSettings={editorSettings}
            handleUpdate={handleUpdate}
          />
        );
      })}
    </>
  );
};

const CodeEditorsPane: React.FC<CodeEditorsPaneProps> = ({
  codesList,
  editorSettings,
  uiLanguage,
  setHtml,
  setCss,
}) => {
  return (
    <StyledContainer>
      <CodeEditorsList
        codesList={codesList}
        editorSettings={editorSettings}
        uiLanguage={uiLanguage}
        setHtml={setHtml}
        setCss={setCss}
      />
    </StyledContainer>
  );
};

export default CodeEditorsPane;
