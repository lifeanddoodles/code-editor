import { indentUnit } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { indentationMarkers } from '@replit/codemirror-indentation-markers';
import { useEffect, useMemo } from 'react';
import { useExtensionCompartment } from '../../hooks/useExtensionCompartment';
import { EditorSettings, INDENT_VALUES } from '../../interfaces';

function isWhitespace(str: string, index: number) {
  if (index < 0) return false;
  const char = str.charAt(index);

  return char === '\u0020' || char === '\t' || char === '\n' || char === '\r';
}

function replaceIndentUnit(
  editorView: EditorView,
  indentWithTabs: boolean,
  indentSize: number,
) {
  const prevIndentCharacter = indentWithTabs ? '\u0020' : '\t';
  const newIndentCharacter = indentWithTabs ? '\t' : '\u0020';

  let text = editorView?.state.doc.toString(),
    pos = 0;
  let changes = [];

  if (text) {
    for (let next; (next = text?.indexOf(prevIndentCharacter, pos)) > -1; ) {
      const indexOfCharToReplace = text?.indexOf(prevIndentCharacter, pos);

      /*
       ** If found and `next`'s previous character is a whitespace character,
       ** continue to replace the selected range with the new indent character.
       */
      if (isWhitespace(text, indexOfCharToReplace - 1)) {
        changes.push({
          from: next,
          to: indentWithTabs ? next + indentSize : next + 1,
          insert: indentWithTabs
            ? newIndentCharacter
            : newIndentCharacter.repeat(indentSize),
        });
      }
      pos = indentWithTabs ? next + indentSize : next + 1;
    }
    editorView.dispatch({ changes });
  }
}

export function useIndentation(
  editorSettings: EditorSettings,
  editorView: EditorView,
) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  const indentWithTabs = useMemo(
    () => editorSettings.indentUnit === INDENT_VALUES.TABS,
    [editorSettings.indentUnit],
  );
  const indentSize = useMemo(
    () => editorSettings.indentWidth!,
    [editorSettings.indentWidth],
  );

  useEffect(() => {
    const indentUnitContent = indentWithTabs
      ? '\t'
      : '\u0020'.repeat(indentSize);

    if (typeof updateCompartment === 'function') {
      updateCompartment([
        indentUnit.of(indentUnitContent),
        EditorState.tabSize.of(indentSize),
        indentationMarkers(),
      ]);
    }
  }, [indentWithTabs, indentSize, updateCompartment]);

  useEffect(() => {
    if (!editorView) return;
    replaceIndentUnit(editorView, indentWithTabs, indentSize);
  }, [indentWithTabs]);

  return compartment;
}
