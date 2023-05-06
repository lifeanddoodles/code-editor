import { EditorView, keymap } from '@codemirror/view';
import {
  abbreviationTracker,
  expandAbbreviation,
} from '@emmetio/codemirror6-plugin';
import { useEffect } from 'react';
import { useExtensionCompartment } from '../../hooks/useExtensionCompartment';
import { EditorSettings, LANGUAGES } from '../../interfaces';

const validEmmetEditorMode = (mode: keyof typeof LANGUAGES) => {
  return Object.keys(LANGUAGES).includes(mode);
};

export function useEmmetExtension(
  language: keyof typeof LANGUAGES,
  editorSettings: EditorSettings,
  editorView: EditorView,
) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  const enabled = editorSettings.emmet;

  useEffect(() => {
    /* Emmet only works properly on certain languages */
    const canUseEmmet = enabled && validEmmetEditorMode(language);

    if (typeof updateCompartment === 'function') {
      updateCompartment(
        canUseEmmet
          ? [
              abbreviationTracker(),
              /* Bind Expand Abbreviation command to keyboard shortcut */
              keymap.of([
                {
                  key: 'Tab',
                  run: expandAbbreviation,
                },
              ]),
            ]
          : [],
      );
    }
  }, [language, enabled, updateCompartment]);

  return compartment;
}
