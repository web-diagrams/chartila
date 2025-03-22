import React, { FC, memo, useCallback, useState } from 'react';
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
};

export const CustomNode: FC<CustomNodeProps> = memo(({ data }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  const onHoveredChange = useCallback(
    (isHovered: boolean) => {
      setIsHovered(() => isHovered);
    },
    [setIsHovered],
  );

  const getNode = () => {
    if (data.nodeType === 'codeNode') {
      return <CodeNode setIsDoubleClicked={setIsDoubleClicked} isDoubleClicked={isDoubleClicked} data={data} />;
    } else {
      return <TextNode setIsDoubleClicked={setIsDoubleClicked} isDoubleClicked={isDoubleClicked} data={data} />;
    }
  };

  return (
    <NodeWrapper setIsDoubleClicked={setIsDoubleClicked} id={data.id} onHoveredChange={onHoveredChange}>
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
