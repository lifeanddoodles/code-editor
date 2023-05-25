import { Dispatch, SetStateAction } from 'react';

export enum LANGUAGES {
  CSS = 'CSS',
  HTML = 'HTML',
}

export enum INDENT_VALUES {
  TABS = 'Tabs',
  SPACES = 'Spaces',
}

export interface Translation {
  [key: string]: string;
}

export interface CodeSampleProps {
  language: keyof typeof LANGUAGES;
  label: string;
  instructions: Translation;
  getInitialCode: (arg: string) => string;
}

export interface EditorSettings {
  theme?: string;
  indentWidth?: number;
  indentUnit?: INDENT_VALUES;
  lineWrapping?: boolean;
  emmet?: boolean;
  gutters?: string[];
  lint?: boolean;
}

export interface CodeEditorsPaneProps {
  codesList: CodeSampleProps[];
  editorSettings: EditorSettings;
  uiLanguage: string;
  setHtml: Dispatch<SetStateAction<string>> | null;
  setCss: Dispatch<SetStateAction<string>> | null;
}

export interface EditorProps {
  displayName?: string;
  language?: keyof typeof LANGUAGES;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  theme?: string;
  extensions?: Array<string | Function | Object>;
  editorSettings?: EditorSettings | undefined;
  handleUpdate: (language: keyof typeof LANGUAGES, content: string) => void;
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

export interface SelectProps {
  label?: string;
  options: FormattedOptionProps[];
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

export interface SelectUIProps {
  label: Translation;
  ariaLabel?: Translation;
  options: {
    label: string | Translation;
    value: string | number;
  }[];
}
