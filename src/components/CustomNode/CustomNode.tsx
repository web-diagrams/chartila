import React, { ChangeEvent, FC, memo, useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import NodeWrapper from '../NodeWrapper/NodeWrapper';
import { useAppDispatch } from '@/app/hooks';
import styles from './CustomeNode.module.scss';
import { classNames } from '@/utils';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { CommonNodeDataType } from '@/redux/flow/interfaces/flowStateInterfaces';
import CodeNode from '../CodeNode/CodeNode';

type CustomNodeProps = {
  data: CommonNodeDataType;
};

export const CustomNode: FC<CustomNodeProps> = memo(({ data }) => {
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
    setIsDoubleClick(!isDoubleClick);
  };

  useEffect(() => {
    if (data?.value) {
      setText(data.value);
    }
  }, [data.value]);

  const getNode = () => {
    if (data.nodeType === 'codeNode') {
      return <CodeNode data={data} />;
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
    <NodeWrapper id={data.id} onDoubleClick={handleDoubleClick} isDoubleClick={isDoubleClick}>
      <Handle type="target" position={Position.Left} onConnect={(params) => console.log('handle onConnect', params)} />
      <div className={classNames(styles.container)}>{isDoubleClick ? getNode() : <div>{text}</div>}</div>
      <Handle type="source" position={Position.Right} id="a" />
    </NodeWrapper>
  );
});
CustomNode.displayName = 'CustomNode';
