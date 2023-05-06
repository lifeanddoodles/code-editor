import { FC } from 'react';
import { EditorProps, LANGUAGES } from '../interfaces';
import Editor from './Editor';

const EditorContainer: FC<EditorProps> = ({
  displayName,
  language = LANGUAGES.HTML,
  value,
  onChange,
  theme = 'oneDark',
  extensions,
  editorSettings,
  handleUpdate,
}) => {
  return (
    <div className={`code-editor code-editor__${language}`}>
      <div className={`code-editor_title code-editor_title__${language}`}>
        {displayName}
      </div>
      <Editor
        value={value}
        onChange={onChange}
        language={language}
        editorSettings={editorSettings}
        theme={theme}
        extensions={extensions}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default EditorContainer;
