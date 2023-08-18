import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { INDENT_VALUES, LANGUAGES } from ".";
import { themes } from "../data/themes";

export interface ConfigProps {
  indentWidth: number;
  emmet: boolean;
  lineWrapping: boolean;
  indentUnit: INDENT_VALUES;
  lint: boolean;
  theme: keyof typeof themes;
}

export interface ContextProps {
  html: string;
  css: string;
  handleUpdate: (content: string, language: keyof typeof LANGUAGES) => void;
  config: ConfigProps;
  setConfig: Dispatch<SetStateAction<ConfigProps>>;
  darkMode: boolean;
  toggleDarkMode: MouseEventHandler<HTMLButtonElement>;
}

export interface ContextProviderProps {
  children: React.ReactNode;
}
