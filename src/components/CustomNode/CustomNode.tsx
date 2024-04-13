import React, { ChangeEvent, FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Position } from 'reactflow';
import NodeWrapper from '../NodeWrapper/NodeWrapper';
import { useAppDispatch } from '@/app/hooks';
import styles from './CustomeNode.module.scss';
import { classNames } from '@/utils';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { CommonNodeDataType } from '@/redux/flow/interfaces/flowStateInterfaces';
import CodeNode from '../CodeNode/CodeNode';
import { CustomHandle } from '../CustomHandle/CustomHandle';

type CustomNodeProps = {
  data: CommonNodeDataType;
};

export const CustomNode: FC<CustomNodeProps> = memo(({ data }) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const onHoveredChange = useCallback((isHovered: boolean) => {
    setIsHovered(() => isHovered);
  }, [setIsHovered])

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setText(value);
  };

  const textWidth = useMemo(() => {
    let number = 0;
    const tempElement = document.createElement('span');
    const maxText = text.split('\n').reduce((longest, word) => {
      return word.length > longest.length
        ? word
        : longest;
    });
    tempElement.textContent = maxText;
    tempElement.style.visibility = 'hidden';
    tempElement.style.fontSize = '12px';
    document.body.appendChild(tempElement);

    number = tempElement.offsetWidth + 2;
    tempElement.remove();
    return number;
  }, [text])

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
          style={{ width: `${textWidth}px` }}
          rows={text.split('\n').length}
          className={classNames(styles.stringInput, {}, ['nodrag'])}
          value={text}
          onBlur={(e) => {
            dispatch(flowActions.onChangeStringNode({ id: data.id, value: e.currentTarget.value }));
          }}
          onChange={onChange}
        />
      );
    }
  };

  return (
    <NodeWrapper id={data.id} onHoveredChange={onHoveredChange}>

      <CustomHandle isVisible={isHovered} type="target" position={Position.Top} id="top-target" />
      <CustomHandle isVisible={isHovered} type="source" position={Position.Top} id="top-source" />

      <CustomHandle isVisible={isHovered} type="target" position={Position.Left} id="left-target" />
      <CustomHandle isVisible={isHovered} type="source" position={Position.Left} id="left-source" />

      <CustomHandle isVisible={isHovered} type="target" position={Position.Right} id="right-target" />
      <CustomHandle isVisible={isHovered} type="source" position={Position.Right} id="right-source" />

      <CustomHandle isVisible={isHovered} type="target" position={Position.Bottom} id="bottom-target" />
      <CustomHandle isVisible={isHovered} type="source" position={Position.Bottom} id="bottom-source" />

      <div className={classNames(styles.container)}>{getNode()}</div>
    </NodeWrapper>
  );
});
CustomNode.displayName = 'CustomNode';