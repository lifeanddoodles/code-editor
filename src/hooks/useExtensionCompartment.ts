import { Compartment, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { useCallback, useMemo } from 'react';

export function useExtensionCompartment(editorView: EditorView) {
  const compartment = useMemo(() => new Compartment(), []);

  const dispatch = editorView?.dispatch;
  const updateCompartment: Function = useCallback(
    function updateCompartment(extension: Extension) {
      if (dispatch) {
        dispatch({
          effects: compartment.reconfigure(extension),
        });
      }
    },
    [compartment, dispatch],
  );

  return [
    /* Initial value of [] to prevent extension errors */
    compartment.of([]) || [],
    updateCompartment,
  ];
}
