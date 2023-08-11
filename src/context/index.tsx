import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { ConfigProps, INDENT_VALUES, LANGUAGES } from "../interfaces";

interface ContextProps {
  html: string;
  css: string;
  handleUpdate: (content: string, language: keyof typeof LANGUAGES) => void;
  config: ConfigProps;
  setConfig: Dispatch<SetStateAction<ConfigProps>>;
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
  },
  setConfig: () => {},
};

export const Context = createContext(defaultProvider);

interface ContextProviderProps {
  children: React.ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [config, setConfig] = useState(defaultProvider.config);
  const [html, setHtml] = useState(defaultProvider.html);
  const [css, setCss] = useState(defaultProvider.css);

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
    <Context.Provider value={{ html, css, config, setConfig, handleUpdate }}>
      {children}
    </Context.Provider>
  );
};

export const useCodesContentContext = () => useContext(Context);
