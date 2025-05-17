import React, { Dispatch, FC, SetStateAction, memo, useEffect, useMemo, useRef, useState } from 'react';
import { CodeNodeData } from '@/redux/doc/interfaces/docStateInterfaces';
import { useAppDispatch } from '@/app/hooks';
import { docActions } from '@/redux/doc/slice/docSlice';
import { useText } from '@/hooks/useText';
import CodeMirror, { EditorView, Extension, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import styles from './CodeNode.module.scss';
import { classNames } from '@/utils';
import { languages } from '@/redux/doc/constants/constants';


type CodeNodeProps = {
  data: CodeNodeData;
  isDoubleClicked: boolean;
  setIsDoubleClicked: Dispatch<SetStateAction<boolean>>;
};

const CodeNode: FC<CodeNodeProps> = memo(({ data, isDoubleClicked, setIsDoubleClicked }) => {
  const editorRef = useRef<ReactCodeMirrorRef | null>(null);

  const dispatch = useAppDispatch();
  const { text: code, onChange } = useText(data.text);

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

  const extensions = useMemo(() => {
    const ext: Extension[] = [
      EditorView.lineWrapping,
    ]
    if (data.language) {
      const method = languages[data.language];
      if (method) {
        ext.push(method());
      }
    }
    return ext;
  }, [data.language])

  return (
    <CodeMirror
      className={classNames(styles.codeMirror, { [styles.textCursor]: isDoubleClicked }, [])}
      ref={editorRef}
      editable={isDoubleClicked}
      value={code}
      onBlur={onBlur}
      extensions={extensions}
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
