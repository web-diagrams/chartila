import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { Position } from 'reactflow';
import NodeWrapper from '../NodeWrapper/NodeWrapper';
import styles from './CustomeNode.module.scss';
import { classNames } from '@/utils';
import { CommonNodeDataType } from '@/redux/doc/interfaces/docStateInterfaces';
import CodeNode from '../CodeNode/CodeNode';
import { CustomHandle } from '../CustomHandle/CustomHandle';
import TextNode from '../TextNode/TextNode';
import { useGetDocState } from '@/redux/doc/hooks/useGetDocState';

type CustomNodeProps = {
  data: CommonNodeDataType;
};

export const CustomNode: FC<CustomNodeProps> = memo(({ data }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const { selectedNodes } = useGetDocState();

  const isSelected = useMemo<boolean>(() => {
    return selectedNodes.includes(data.id);
  }, [data.id, selectedNodes]);

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
      id={data.id}
      onHoveredChange={onHoveredChange}
      isSelected={isSelected}
    >
      <CustomHandle isVisible={isHovered} type="target" position={Position.Top} id="top-target" />
      <CustomHandle isVisible={isHovered} type="source" position={Position.Top} id="top-source" />

      <CustomHandle isVisible={isHovered} type="target" position={Position.Left} id="left-target" />
      <CustomHandle isVisible={isHovered} type="source" position={Position.Left} id="left-source" />

      <CustomHandle isVisible={isHovered} type="target" position={Position.Right} id="right-target" />
      <CustomHandle isVisible={isHovered} type="source" position={Position.Right} id="right-source" />

      <CustomHandle isVisible={isHovered} type="target" position={Position.Bottom} id="bottom-target" />
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
