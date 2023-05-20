import { FC, useState } from 'react';
import styled from 'styled-components';
import { EditorProps, LANGUAGES } from '../interfaces';
import Button from './Button';
import Editor from './Editor';

const StyledEditorContainer = styled.details`
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: auto ${({ open }) => (open ? '1fr' : '0')};
  ${({ open }) => (open ? 'flex-grow: 1;' : 'flex-shrink: 1;')};
  position: relative;

  .code-editor_ref {
    height: 100%;
    position: relative;
    display: ${({ open }) => (open ? 'block' : 'hidden')};
  }

  .cm-editor {
    height: 100%;
  }

  @media screen and (min-width: 640px) {
  }
`;

const StyledEditorHeader = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--secondary-color);
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;

  h2 {
    font-size: 1rem;
    line-height: 1.25;
    margin: 0;
  }
`;

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
  const [open, setOpen] = useState<boolean>(true);

  const handleOpenToggle = () => {
    setOpen((open) => !open);
  };

  return (
    <StyledEditorContainer
      className={`code-editor code-editor__${language}`}
      open={open}
    >
      <StyledEditorHeader
        className={`code-editor_header code-editor_header__${language}`}
      >
        <h2>{displayName}</h2>
        <Button label={open ? 'Close' : 'Open'} onClick={handleOpenToggle} />
      </StyledEditorHeader>
      <Editor
        value={value}
        onChange={onChange}
        language={language}
        editorSettings={editorSettings}
        theme={theme}
        extensions={extensions}
        handleUpdate={handleUpdate}
      />
    </StyledEditorContainer>
  );
};

export default EditorContainer;
