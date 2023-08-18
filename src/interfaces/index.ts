import { Extension } from "@codemirror/state";
import { themes } from "../data/themes";

export enum LANGUAGES {
  CSS = "CSS",
  HTML = "HTML",
}

export enum INDENT_VALUES {
  TABS = "Tabs",
  SPACES = "Spaces",
}

export interface CodeSampleProps {
  language: keyof typeof LANGUAGES;
  label: string;
  getInitialCode: (arg: string) => string;
}

export interface ConfigProps {
  indentWidth: number;
  emmet: boolean;
  lineWrapping: boolean;
  indentUnit: INDENT_VALUES;
  lint: boolean;
  theme: keyof typeof themes;
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

export interface OptionProps {
  label: string | React.ReactElement;
  value: string | number;
  ariaLabel?: string;
}

export interface BaseSelectProps {
  id?: string;
  ariaLabel?: string;
  label?: string;
  disabled?: boolean;
  options: OptionProps[];
}

export interface SelectProps extends BaseSelectProps {
  value: string | number | undefined;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
