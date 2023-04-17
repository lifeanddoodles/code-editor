import { EditorView } from 'codemirror';
import { useEffect } from 'react';
import { useExtensionCompartment } from '../../hooks/useExtensionCompartment';
import { EditorSettings } from '../../interfaces';

export function useLineWrapping(
  editorSettings: EditorSettings,
  editorView: EditorView,
) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    if (typeof updateCompartment === 'function') {
      updateCompartment(
        editorSettings?.lineWrapping ? EditorView.lineWrapping : null,
      );
    }
  }, [editorSettings?.lineWrapping, updateCompartment]);

  return compartment;
}
