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

export interface EditorProps {
  displayName?: string;
  language?: keyof typeof LANGUAGES;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  theme?: string;
  extensions?: Array<string | Function | Object>;
  editorSettings?: EditorSettings | undefined;
}
