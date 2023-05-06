import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface ContextProps {
  html: string;
  setHtml: Dispatch<SetStateAction<string>> | null;
  css: string;
  setCss: Dispatch<SetStateAction<string>> | null;
}

const defaultProvider: ContextProps = {
  html: '',
  css: '',
  setHtml: null,
  setCss: null,
};

export const Context = createContext(defaultProvider);

interface ContextProviderProps {
  children: React.ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');

  return (
    <Context.Provider value={{ html, setHtml, css, setCss }}>
      {children}
    </Context.Provider>
  );
};

export const useCodesContentContext = () => useContext(Context);
