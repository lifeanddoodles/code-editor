import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import { ContextProvider } from "./context";
import i18n from "./i18n";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </I18nextProvider>
  </React.StrictMode>
);
