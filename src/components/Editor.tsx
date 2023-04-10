import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

interface EditorProps {
  language?: string;
  displayName?: string;
  value?: string;
  onChange?: Dispatch<SetStateAction<string>>;
}

const Editor: FC<EditorProps> = () => {
  const editor = useRef<HTMLDivElement>(null);

  const [code, setCode] = useState('');

  const onUpdate = EditorView.updateListener.of((v) => {
    setCode(v.state.doc.toString());
  });

  useEffect(() => {
    const state = EditorState.create({
      doc: 'Hello World',
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab]),
        javascript(),
        onUpdate,
      ],
    });

    const view = new EditorView({
      state,
      parent: editor.current ?? undefined,
    });

    return () => {
      view.destroy();
    };
  }, []);

  return <div ref={editor}></div>;
};

export default Editor;
