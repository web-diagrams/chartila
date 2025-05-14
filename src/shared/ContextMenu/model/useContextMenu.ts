import { useCallback, useState } from 'react';
import { StateType } from './contexMenuTypes';
import { useReactFlow } from 'reactflow';

export const useContextMenu = () => {
  const { screenToFlowPosition } = useReactFlow();

  const [contextMenuProps, setContextMenuProps] = useState<StateType>({
    isOpen: false,
    style: { top: 0, left: 0 },
    nodePosition: { x: 0, y: 0 },
    isNode: false,
  });

  const onNodeContextMenu = useCallback((e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenuProps((props) => ({
      ...props,
      isOpen: true,
      style: { left: `${e.clientX}px`, top: `${e.clientY}px` },
      nodePosition: screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      }),
      isNode: true,
    }));
  }, [])

  const onShowContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();

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
    setContextMenuProps((props) => ({
      ...props,
      isNode: false,
      isOpen: false,
    }));
  }, []);

  return {
    contextMenuProps,
    onShowContextMenu,
    onCloseContextMenu,
    onNodeContextMenu,
  };
};
