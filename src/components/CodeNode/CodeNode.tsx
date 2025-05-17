import { Dispatch, FC, SetStateAction, memo, useMemo } from 'react';
import { CodeNodeData } from '@/redux/doc/interfaces/docStateInterfaces';
import { useAppDispatch } from '@/app/hooks';
import { docActions } from '@/redux/doc/slice/docSlice';
import { useText } from '@/hooks/useText';
import CodeMirror, { EditorView, Extension } from '@uiw/react-codemirror';
import style from './CodeNode.module.scss';
import { classNames } from '@/utils';
import { languages } from '@/redux/doc/constants/constants';
import styles from '../CustomNode/CustomeNode.module.scss';

type CodeNodeProps = {
  data: CodeNodeData;
  isDoubleClicked: boolean;
  setIsDoubleClicked: Dispatch<SetStateAction<boolean>>;
};

const CodeNode: FC<CodeNodeProps> = memo(({ data, isDoubleClicked, setIsDoubleClicked }) => {
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
      className={classNames(
        styles.customNode,
        {},
        [style.codeMirror, style.textCursor]
      )}
      readOnly={!isDoubleClicked}
      autoFocus={isDoubleClicked}
      value={code}
      onBlur={onBlur}
      extensions={extensions}
      basicSetup={{
        lineNumbers: false,
        highlightActiveLine: false,
        foldGutter: false,
        autocompletion: false,
      }}
      onChange={onChange}
    />
  );
});
CodeNode.displayName = 'CodeNode';
export default CodeNode;
