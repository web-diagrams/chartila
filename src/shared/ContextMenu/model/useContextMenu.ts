import { useCallback, useState } from 'react';
import { StateType } from './contexMenuTypes';
import { useReactFlow, type Node } from 'reactflow';

export const useContextMenu = () => {
  const [isDiagramContextOpened, setIsDiagramContextOpened] = useState(false);
  const [node, setNode] = useState<Node | null>(null);
  
  const { screenToFlowPosition } = useReactFlow();

  const [contextMenuProps, setContextMenuProps] = useState<StateType>({
    style: { top: 0, left: 0 },
    nodePosition: { x: 0, y: 0 },
  });

  const onNodeContextMenu = useCallback((e: React.MouseEvent<Element, MouseEvent>, node: Node) => {
    e.preventDefault();
    e.stopPropagation();
    setNode(node);
    setContextMenuProps((props) => ({
      ...props,
      style: { left: `${e.clientX}px`, top: `${e.clientY}px` },
      nodePosition: screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      }),
    }));
  }, [])

  const onShowContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      setIsDiagramContextOpened(true);
      setContextMenuProps((props) => ({
        ...props,
        isOpen: true,
        style: { left: `${event.clientX}px`, top: `${event.clientY}px` },
        nodePosition: screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        }),
      }));
    },
    [screenToFlowPosition],
  );

  const onCloseContextMenu = useCallback(() => {
    setIsDiagramContextOpened(false);
    setNode(null);
    setContextMenuProps((props) => ({
      ...props,
      isOpen: false,
    }));
  }, []);

  return {
    contextMenuProps,
    onShowContextMenu,
    onCloseContextMenu,
    onNodeContextMenu,
    isDiagramContextOpened,
    node,
  };
};
