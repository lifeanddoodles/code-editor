import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { FC, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { EditorProps, LANGUAGES } from "../interfaces";
import Details from "./Details";
import Editor from "./Editor";
import Summary from "./Summary";

const StyledEditorContainer = styled(Details)`
  ${({ open }) =>
    open
      ? `
    grid-template-rows: auto 1fr;
    flex-grow: 1;
    
    .code-editor_ref {
      display: block;
    }`
      : `
    grid-template-rows: auto 0;
    flex-shrink: 1;
    
    .code-editor_ref {
      display: hidden;
    }`}
`;

const EditorContainer: FC<EditorProps> = ({
  displayName,
  language = LANGUAGES.HTML,
  value,
  onChange,
  theme = "oneDark",
  extensions,
  editorSettings,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const icon = useMemo(
    () =>
      isOpen ? (
        <ChevronUpIcon width={"2rem"} />
      ) : (
        <ChevronDownIcon width={"2rem"} />
      ),
    [isOpen]
  );

  const handleOpenToggle = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setIsOpen((prev) => !prev);
    },
    []
  );

  return (
    <StyledEditorContainer
      className={`code-editor code-editor__${language} code-editor--${
        isOpen ? "open" : "closed"
      }`}
      open={isOpen}
    >
      <Summary
        title={displayName}
        icon={icon}
        onClick={handleOpenToggle}
        className={`code-editor_header code-editor_header__${language}`}
      />
      <Editor
        value={value}
        onChange={onChange}
        language={language}
        editorSettings={editorSettings}
        theme={theme}
        extensions={extensions}
      />
    </StyledEditorContainer>
  );
};

export default EditorContainer;
