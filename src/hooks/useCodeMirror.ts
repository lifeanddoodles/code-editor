/*
 * Credits: https://codesandbox.io/s/codemirror-6-needs-2el3gd?file=/components/CodeMirror6Instance/CodeMirror6InstanceHooks.js
 */

import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { htmlLinter } from "../components/extensions/linters";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { lintGutter, lintKeymap, linter } from "@codemirror/lint";
import { EditorState, Extension } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { useEffect, useMemo, useRef, useState } from "react";
import { useEmmetExtension } from "../components/extensions/emmet";
import { useExtensions } from "../hooks/useExtensions";
import { EditorProps, LANGUAGES } from "../interfaces";

const htmlConfig = {
  matchClosingTags: true,
  selfClosingTags: true,
  autoCloseTags: true,
};

const LANGUAGES_SETUP = {
  HTML: html(htmlConfig),
  CSS: css(),
};

export default function useCodeMirror({
  value,
  onChange,
  language = LANGUAGES.HTML,
  extensions = [],
  editorSettings,
}: EditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<EditorView | undefined>();

  const onUpdate = EditorView.updateListener.of((view) => {
    const updatedValue = view.state.doc.toString();
    onChange(updatedValue, language);
  });

  const emmetExtension = useEmmetExtension(language, editorSettings!, view!);
  const uiExtensions = useExtensions(editorSettings!, view!);

  const extensionsAll: Extension[] = useMemo(
    () =>
      [
        /**
         * Order for Emmet & default is important
         * to allow `tab` key indentation to work.
         */
        emmetExtension as Extension,
        basicSetup,
        keymap.of([...defaultKeymap, ...lintKeymap, indentWithTab]),
        LANGUAGES_SETUP[language],
        lintGutter(),
        language === LANGUAGES.HTML ? linter(htmlLinter) : [],
        onUpdate,
        ...extensions,
        ...(uiExtensions as Extension[]),
      ].filter(Boolean),
    []
  );

  useEffect(() => {
    const editorState = EditorState.create({
      doc: value,
      extensions: extensionsAll,
    });

    const view = new EditorView({
      state: editorState,
      parent: ref.current ?? undefined,
    });

    setView(view);

    /**
     * Make sure to destroy the codemirror instance
     * when our components are unmounted.
     */
    return () => {
      view.destroy();
      setView(undefined);
    };
  }, []);

  return { ref };
}
