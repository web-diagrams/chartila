import React, { Dispatch, FC, SetStateAction, memo } from 'react';
import { classNames } from '@/utils';
import { CodeNodeData } from '@/redux/doc/interfaces/docStateInterfaces';
import styles from '../CustomNode/CustomeNode.module.scss';
import CodeComponent from './CodeComponent';
import { useAppDispatch } from '@/app/hooks';
import { docActions } from '@/redux/doc/slice/docSlice';
import { useText } from '@/hooks/useText';

type CodeNodeProps = {
  data: CodeNodeData;
  isDoubleClicked: boolean;
  setIsDoubleClicked: Dispatch<SetStateAction<boolean>>;
};

const CodeNode: FC<CodeNodeProps> = memo(({ data, isDoubleClicked, setIsDoubleClicked }) => {
  const dispatch = useAppDispatch();
  const { text, onChange, textWidth } = useText(data.text);

  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    dispatch(docActions.onChangeNode({ id: data.id, key: 'text', value: e.currentTarget.value, saveToHistory: true }));
    setIsDoubleClicked(false);
  };

  return (
    <>
      <div className={classNames('', { [styles.inputWrapper]: data.isWrapped }, [])}>
        {isDoubleClicked ? (
          <textarea
            style={{ width: `${textWidth}px` }}
            rows={text.split('\n').length}
            className={classNames(styles.customNode)}
            value={text}
            onChange={onChange}
            onBlur={onBlur}
            autoFocus
          />
        ) : (
          <CodeComponent code={text} />
        )}
      </div>
    </>
  );
});
CodeNode.displayName = 'CodeNode';
export default CodeNode;
