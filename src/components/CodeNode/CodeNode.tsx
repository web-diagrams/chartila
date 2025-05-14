import React, { Dispatch, FC, SetStateAction, memo, useEffect, useRef, useState } from 'react';
import { CodeNodeData } from '@/redux/doc/interfaces/docStateInterfaces';
import { useAppDispatch } from '@/app/hooks';
import { docActions } from '@/redux/doc/slice/docSlice';
import { useText } from '@/hooks/useText';
import CodeMirror, { EditorView, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import styles from './CodeNode.module.scss';
import { classNames } from '@/utils';

type CodeNodeProps = {
  data: CodeNodeData;
  isDoubleClicked: boolean;
  setIsDoubleClicked: Dispatch<SetStateAction<boolean>>;
};

const CodeNode: FC<CodeNodeProps> = memo(({ data, isDoubleClicked, setIsDoubleClicked }) => {
  const editorRef = useRef<ReactCodeMirrorRef | null>(null);

  const dispatch = useAppDispatch();
  const [language, setLanguage] = useState('javascript');
  const { text: code, onChange } = useText(data.text);

  const onChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
  }

  const onBlur = () => {
    dispatch(
      docActions.onChangeNode({
        id: data.id,
        key: 'text',
        value: code,
        saveToHistory: true,
      })
    );
    setIsDoubleClicked(false);
  };

  // Фокус при isDoubleClicked
  useEffect(() => {
    const view = editorRef.current?.view;
    if (isDoubleClicked && view) {
      view.focus();
    }
  }, [isDoubleClicked]);

  return (
    <CodeMirror
      className={classNames(styles.codeMirror, { [styles.textCursor]: isDoubleClicked }, [])}
      ref={editorRef}
      editable={isDoubleClicked}
      value={code}
      onBlur={onBlur}
      extensions={[
        javascript(),
        EditorView.lineWrapping,
      ]}
      basicSetup={{
        lineNumbers: false,
        highlightActiveLine: false,
        foldGutter: false,
      }}
      onChange={onChange}
    />
  );
});
CodeNode.displayName = 'CodeNode';
export default CodeNode;
