import { indentUnit } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { indentationMarkers } from '@replit/codemirror-indentation-markers';
import { useEffect } from 'react';
import { useExtensionCompartment } from '../../hooks/useExtensionCompartment';
import { EditorSettings, INDENT_VALUES } from '../../interfaces';

export function useIndentation(
  editorSettings: EditorSettings,
  editorView: EditorView,
) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  const shouldIndentWithTab = editorSettings.indentUnit === INDENT_VALUES.TABS;
  const indentSize = editorSettings.indentWidth!;

  useEffect(() => {
    const indentUnitValue = shouldIndentWithTab ? '\t' : ' '.repeat(indentSize);

    if (typeof updateCompartment === 'function') {
      updateCompartment([
        indentUnit.of(indentUnitValue),
        EditorState.tabSize.of(indentSize),
        indentationMarkers(),
      ]);
    }
  }, [shouldIndentWithTab, indentSize, updateCompartment]);

  // TODO: convert tabs & spaces

  return compartment;
}
