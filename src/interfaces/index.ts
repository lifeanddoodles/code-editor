import { Dispatch, SetStateAction } from 'react';

export const LANGUAGES = {
  CSS: 'CSS',
  HTML: 'HTML',
};

export enum INDENT_VALUES {
  TABS = 'Tabs',
  SPACES = 'Spaces',
}

export interface Translation {
  [key: string]: string;
}

export interface EditorSettings {
  theme?: string;
  indentWidth?: number;
  indentUnit?: INDENT_VALUES;
  lineWrapping?: boolean;
  emmet?: boolean;
}

export interface EditorProps {
  displayName?: string;
  language?: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  theme?: string;
  extensions?: Array<string | Function | Object>;
  editorSettings?: EditorSettings | undefined;
}
