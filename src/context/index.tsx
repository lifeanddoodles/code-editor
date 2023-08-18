import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import useDarkMode from "../hooks/useDarkMode";
import { ConfigProps, INDENT_VALUES, LANGUAGES } from "../interfaces";

interface ContextProps {
  html: string;
  css: string;
  handleUpdate: (content: string, language: keyof typeof LANGUAGES) => void;
  config: ConfigProps;
  setConfig: Dispatch<SetStateAction<ConfigProps>>;
  darkMode: boolean;
  toggleDarkMode: MouseEventHandler<HTMLButtonElement>;
}

const defaultProvider: ContextProps = {
  html: "",
  css: "",
  handleUpdate: () => {},
  config: {
    indentWidth: 2,
    emmet: true,
    lineWrapping: true,
    indentUnit: INDENT_VALUES.TABS,
    lint: true,
    theme: "oneDark",
  },
  setConfig: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
};

export const Context = createContext(defaultProvider);

interface ContextProviderProps {
  children: React.ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [config, setConfig] = useState(defaultProvider.config);
  const [html, setHtml] = useState(defaultProvider.html);
  const [css, setCss] = useState(defaultProvider.css);
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleUpdate = useCallback(
    (content: string, language: keyof typeof LANGUAGES) => {
      switch (language) {
        case LANGUAGES.CSS:
          setCss!(content);
          break;
        case LANGUAGES.HTML:
        default:
          setHtml!(content);
          break;
      }
    },
    []
  );

  return (
    <Context.Provider
      value={{
        html,
        css,
        config,
        setConfig,
        handleUpdate,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCodesContentContext = () => useContext(Context);
