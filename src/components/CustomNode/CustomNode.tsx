import React, { ChangeEvent, FC, memo, useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import NodeWrapper from '../NodeWrapper/NodeWrapper';
import { useAppDispatch } from '@/app/hooks';
import styles from './CodeNode.module.scss';
import { classNames } from '@/utils';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { CodeNodeData, StringNodeData } from '@/redux/flow/interfaces/flowStateInterfaces';

type CodeNodeProps = {
  data: StringNodeData | CodeNodeData;
};

const CustomNode: FC<CodeNodeProps> = memo(({ data }) => {
  const dispatch = useAppDispatch();
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [text, setText] = useState<string>('');

  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.currentTarget.value;
      setText(value);
    },
    [text],
  );

  const handleDoubleClick = () => {
    setIsDoubleClick(true);
  };

  useEffect(() => {
    if (data?.value) {
      setText(data.value);
    }
  }, [data.value]);

  const getNode = () => {
    if (data.nodeType === 'codeNode') {
      return (
        <>
          <div className={classNames('', { [styles.inputWrapper]: data.isWrapped }, [])}>
            <textarea
              rows={data.isWrapped ? 1 : text.split('\n').length}
              className={classNames(styles.codeInput)}
              value={text}
              onChange={onChange}
            />
          </div>
          <button className={styles.wrapButton}>{data.isWrapped ? <IoIosArrowDown /> : <IoIosArrowUp />}</button>
        </>
      );
    } else {
      return (
        <textarea
          className={styles.stringInput}
          value={text}
          onBlur={(e) => {
            dispatch(flowActions.onChangeStringNode({ id: data.id, value: e.currentTarget.value }));
            setIsDoubleClick(false);
          }}
          onChange={onChange}
        />
      );
    }
  };

  return (
    <NodeWrapper
      id={data.id}
      onDoubleClick={handleDoubleClick}
      isDoubleClick={isDoubleClick}
      setIsDoubleClick={setIsDoubleClick}
    >
      <Handle type="target" position={Position.Left} onConnect={(params) => console.log('handle onConnect', params)} />
      <div className={classNames(styles.container)}>{isDoubleClick ? getNode() : <div>{text}</div>}</div>
      <Handle type="source" position={Position.Right} id="a" />
    </NodeWrapper>
  );
});
CustomNode.displayName = 'CodeNode';

export default CustomNode;
