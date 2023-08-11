import { FC } from "react";
import useCodeMirror from "../hooks/useCodeMirror";
import { EditorProps, LANGUAGES } from "../interfaces";

const Editor: FC<EditorProps> = ({
  language = LANGUAGES.HTML,
  value,
  onChange,
  theme = "oneDark",
  extensions,
  editorSettings,
}) => {
  const { ref } = useCodeMirror({
    value,
    onChange,
    language,
    editorSettings,
    theme,
    extensions,
  });

  return (
    <div
      ref={ref}
      className={`code-editor_ref code-editor_ref__${language}`}
    ></div>
  );
};

export default Editor;
