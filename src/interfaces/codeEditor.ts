import { Extension } from "@codemirror/state";
import { ConfigProps, LANGUAGES } from "../interfaces";

export interface CodeSampleProps {
  language: keyof typeof LANGUAGES;
  label: string;
  getInitialCode: (arg: string) => string;
}

export interface EditorSettings extends ConfigProps {
  gutters: string[];
}

export interface CodeEditorsPaneProps {
  codesList: CodeSampleProps[];
  editorSettings: EditorSettings;
}

export interface EditorProps {
  displayName?: string;
  language?: keyof typeof LANGUAGES;
  value: string;
  onChange: (content: string, language: keyof typeof LANGUAGES) => void;
  theme?: string;
  extensions?: Array<Extension>;
  editorSettings: EditorSettings;
}
