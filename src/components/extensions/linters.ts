import { Diagnostic } from '@codemirror/lint';
import { EditorView } from 'codemirror';
import { HTMLHint } from 'htmlhint';
import { Hint, Ruleset } from 'htmlhint/types';

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

export const htmlLinter = (view: EditorView): Diagnostic[] => {
  const htmlValue = view.state.doc.toString();
  const results: Hint[] = HTMLHint.verify(htmlValue, rulesets);
  let found = [];
  let message = null;

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
