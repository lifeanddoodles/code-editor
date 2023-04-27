import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
// import { lintGutter, linter, openLintPanel } from "@codemirror/lint";
import { linter, lintGutter, lintKeymap } from '@codemirror/lint';
import { EditorState, Extension } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { HTMLHint } from 'htmlhint';
import { Ruleset } from 'htmlhint/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useEmmetExtension } from '../components/extensions/emmet';
import { useExtensions } from '../hooks/useExtensions';
import { EditorProps, LANGUAGES } from '../interfaces';

const themes: any = { oneDark };

const LANGUAGES_SETUP: any = {
  HTML: html(),
  CSS: css(),
};

export default function useCodeMirror({
  value,
  onChange,
  language = LANGUAGES.HTML,
  theme = 'oneDark',
  extensions,
  editorSettings,
}: EditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<EditorView | undefined>();

  const onUpdate = EditorView.updateListener.of((view) => {
    onChange(view.state.doc.toString());
  });

  const html_linter = (view: EditorView) => {
    var rulesets: Ruleset = {
      'doctype-first': false,
      'doctype-html5': true,
      // "tags-check": true,
      'tag-pair': true,
      'tag-self-close': true,
      'tagname-lowercase': true,
      'tagname-specialchars': true,
      'empty-tag-not-self-closed': true,
      'src-not-empty': true,
      // "href-abs-or-rel": true,
      'attr-no-duplication': true,
    };
    var found = [];
    var results = HTMLHint.verify(value, rulesets),
      message = null;
    for (var i = 0; i < results.length; i++) {
      message = results[i];
      var startLine = message.line - 1,
        endLine = message.line,
        startCol = message.col,
        endCol = message.col;
      // console.log(startLine, endLine, startCol, endCol);
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
        LANGUAGES_SETUP[language],
        keymap.of([...defaultKeymap, ...lintKeymap, indentWithTab]),
        lintGutter(),
        language === LANGUAGES.HTML && linter(html_linter),
        ...(theme !== 'default' ? themes[theme] : []),
        onUpdate,
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