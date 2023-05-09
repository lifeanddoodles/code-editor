import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
// import { lintGutter, linter, openLintPanel } from "@codemirror/lint";
import { Diagnostic, lintGutter, lintKeymap, linter } from '@codemirror/lint';
import { EditorState, Extension } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { HTMLHint } from 'htmlhint';
import { Hint, Ruleset } from 'htmlhint/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useEmmetExtension } from '../components/extensions/emmet';
import { useExtensions } from '../hooks/useExtensions';
import { EditorProps, LANGUAGES } from '../interfaces';

const themes: any = { oneDark };

const htmlConfig = {
  matchClosingTags: true,
  selfClosingTags: true,
  autoCloseTags: true,
};

const LANGUAGES_SETUP: any = {
  HTML: html(htmlConfig),
  CSS: css(),
};

export default function useCodeMirror({
  value,
  onChange,
  language = LANGUAGES.HTML,
  theme = 'oneDark',
  extensions,
  editorSettings,
  handleUpdate,
}: EditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<EditorView | undefined>();

  const onUpdate = EditorView.updateListener.of((view) => {
    onChange(() => {
      handleUpdate(language, view.state.doc.toString());
      return view.state.doc.toString();
    });
  });

  // TODO: Make lint update onChange
    const rulesets: Ruleset = {
      'doctype-first': false,
      'tag-pair': true,
      'tag-self-close': true,
      'tagname-lowercase': true,
      'tagname-specialchars': true,
      'empty-tag-not-self-closed': true,
      'src-not-empty': true,
      'attr-no-duplication': true,
      'attr-lowercase': true,
      'attr-value-double-quotes': true,
      'spec-char-escape': true,
      'id-unique': true,
    };
  const htmlLinter = (view: EditorView): Diagnostic[] => {
    let found = [];
    let message = null;
    const results: Hint[] = HTMLHint.verify(value, rulesets);

    for (let i = 0; i < results.length; i++) {
      message = results[i];
      const startLine = message.line - 1,
        endLine = message.line,
        startCol = message.col,
        endCol = message.col;

      found.push({
        from: startCol,
        to: endCol,
        message: message.message,
        severity: message.type,
      });
    }
    return found;
  };

  const emmetExtension = useEmmetExtension(language, editorSettings!, view!);
  const uiExtensions = useExtensions(editorSettings, view!);

  const extensionsAll: Extension[] = useMemo(
    () =>
      [
        /**
         * Order for Emmet & default is important
         * to allow `tab` key indentation to work.
         */
        emmetExtension,
        basicSetup,
        keymap.of([...defaultKeymap, ...lintKeymap, indentWithTab]),
        LANGUAGES_SETUP[language],
        lintGutter(),
        language === LANGUAGES.HTML ? linter(htmlLinter) : [],
        onUpdate,
        ...(theme !== 'default' ? themes[theme] : []),
        ...(extensions ?? []),
        ...[uiExtensions],
      ].filter(Boolean),
    [],
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
