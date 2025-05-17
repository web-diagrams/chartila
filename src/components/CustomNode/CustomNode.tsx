import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { Position } from 'reactflow';
import NodeWrapper from '../NodeWrapper/NodeWrapper';
import styles from './CustomeNode.module.scss';
import { classNames } from '@/utils';
import { CommonNodeDataType } from '@/redux/doc/interfaces/docStateInterfaces';
import CodeNode from '../CodeNode/CodeNode';
import { CustomHandle } from '../CustomHandle/CustomHandle';
import TextNode from '../TextNode/TextNode';

type CustomNodeProps = {
  data: CommonNodeDataType;
  selected: boolean;
};

export const CustomNode: FC<CustomNodeProps> = memo(({ data, selected }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  const onHoveredChange = useCallback(
    (isHovered: boolean) => {
      setIsHovered(() => isHovered);
    },
    [setIsHovered],
  );

  const node = useMemo(() => {
    if (data.nodeType === 'codeNode') {
      return <CodeNode setIsDoubleClicked={setIsDoubleClicked} isDoubleClicked={isDoubleClicked} data={data} />;
    } else {
      return <TextNode setIsDoubleClicked={setIsDoubleClicked} isDoubleClicked={isDoubleClicked} data={data} />;
    }
  }, [data, isDoubleClicked, setIsDoubleClicked]);

  return (
    <NodeWrapper
      setIsDoubleClicked={setIsDoubleClicked}
      data={data}
      onHoveredChange={onHoveredChange}
      isSelected={selected}
    >
      <CustomHandle isVisible={isHovered} type="target" position={Position.Top} id="top-target" />

      <CustomHandle isVisible={isHovered} type="target" position={Position.Left} id="left-target" />

      <CustomHandle isVisible={isHovered} type="source" position={Position.Right} id="right-source" />

      <CustomHandle isVisible={isHovered} type="source" position={Position.Bottom} id="bottom-source" />

      <div
        className={classNames(
          styles.container,
          {
            'nodrag': isDoubleClicked,
            [styles.grabCursor]: !isDoubleClicked,
          }
        )}
      >{node}</div>
    </NodeWrapper>
  );
});
CustomNode.displayName = 'CustomNode';
