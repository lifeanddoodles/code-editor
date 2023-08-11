export enum LANGUAGES {
  CSS = "CSS",
  HTML = "HTML",
}

export enum INDENT_VALUES {
  TABS = "Tabs",
  SPACES = "Spaces",
}

export interface Translation {
  [key: string]: string;
}

export interface CodeSampleProps {
  language: keyof typeof LANGUAGES;
  label: string;
  getInitialCode: (arg: string) => string;
}

export interface ConfigProps {
  indentWidth: number;
  emmet?: boolean;
  lineWrapping?: boolean;
  indentUnit?: INDENT_VALUES;
  lint?: boolean;
}

export interface EditorSettings extends ConfigProps {
  theme?: string;
  gutters?: string[];
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
  extensions?: Array<string | Function | Object>;
  editorSettings?: EditorSettings | undefined;
}

export interface OptionProps {
  label: string | Translation;
  value: string | number;
  ariaLabel?: string;
}

export interface FormattedOptionProps extends OptionProps {
  label: string;
  value: string | number;
  ariaLabel?: string;
}

export interface BaseSelectProps {
  id?: string;
  ariaLabel?: string;
  label?: string | Translation;
  options: FormattedOptionProps[];
  disabled?: boolean;
}

export interface SelectProps extends BaseSelectProps {
  label?: string;
  value: string | number | undefined;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface SelectUIProps {
  label: Translation;
  ariaLabel?: Translation;
  options: {
    label: string | Translation;
    value: string | number;
  }[];
}
