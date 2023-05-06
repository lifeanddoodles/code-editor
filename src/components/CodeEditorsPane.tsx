import { useState } from 'react';
import Column from '../components/Column';
import EditorContainer from '../components/EditorContainer';
import { CODE_SAMPLES } from '../data/code';
import { CodeSampleProps, LANGUAGES } from '../interfaces';

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
}: any) => {
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

  return codesList.map((codeLang: any) => {
    const codeObj = getLanguageSetup(codeLang.language);
    const [content, setContent] = useState(
      codeObj?.getInitialCode(codeObj?.instructions[uiLanguage]) || '',
    );
    return (
      codeObj && (
        <EditorContainer
          key={codeLang.language}
          language={codeObj?.language}
          value={content}
          onChange={setContent}
          displayName={codeObj?.label}
          editorSettings={editorSettings}
          handleUpdate={handleUpdate}
        />
      )
    );
  });
};

const CodeEditorsPane = ({
  codesList,
  editorSettings,
  uiLanguage,
  setHtml,
  setCss,
}: any) => {
  return (
    <Column>
      <CodeEditorsList
        codesList={codesList}
        editorSettings={editorSettings}
        uiLanguage={uiLanguage}
        setHtml={setHtml}
        setCss={setCss}
      />
    </Column>
  );
};

export default CodeEditorsPane;
