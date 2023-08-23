import { FC } from "react";
import styled from "styled-components";
import { EditorProps, LANGUAGES } from "../../interfaces";
import Editor from "../Editor";

const StyledEditorContainer = styled("div")`
  height: 100%;

  .code-editor_ref,
  .cm-editor {
    height: 100%;
  }

  &.code-editor--hidden {
    display: none;
  }
`;

const EditorContainerMobile: FC<EditorProps & { isHidden?: boolean }> = ({
  id,
  language = LANGUAGES.HTML,
  value,
  onChange,
  extensions,
  editorSettings,
  ariaLabelledby,
  isHidden,
}) => {
  return (
    <StyledEditorContainer
      className={`code-editor code-editor__${language} code-editor--${
        isHidden ? "hidden" : "open"
      }`}
      id={id}
      aria-labelledby={ariaLabelledby}
      role="tabpanel"
    >
      <Editor
        value={value}
        onChange={onChange}
        language={language}
        editorSettings={editorSettings}
        extensions={extensions}
      />
    </StyledEditorContainer>
  );
};

export default EditorContainerMobile;
