import { EditorView } from '@codemirror/view';
import { useRef } from 'react';
import { useIndentation } from '../components/extensions/indentation';
import { useLineWrapping } from '../components/extensions/lineWrapping';
import { EditorSettings } from '../interfaces';

export function useExtensions(
  editorSettings: EditorSettings | undefined,
  editorView: EditorView,
) {
  if (!editorSettings) return;
  const lineWrappingExtension = useLineWrapping(editorSettings, editorView);
  const indentationExtension = useIndentation(editorSettings, editorView);

  /**
   * Store as a ref because the extensions themselves
   * are stored in compartments that won't change.
   * We don't need to rebuild this array every time it re-renders.
   */
  const extensionsRef = useRef([lineWrappingExtension, indentationExtension]);

  return extensionsRef.current;
}
