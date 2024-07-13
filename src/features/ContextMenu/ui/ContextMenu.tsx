import { useCallback } from 'react';
import { StateType } from '../model/contexMenuTypes';
import styles from './ContextMenu.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Button from '@/shared/Button';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { NodeData } from '@/redux/flow/constants/constants';

type ContextMenuProps = {
  state: StateType;
};

export const ContextMenu = ({ state }: ContextMenuProps) => {
  const dispatch = useAppDispatch();

  const { pages, currentPageId } = useAppSelector((state) => state.flow);

  const saveToFile = useCallback(() => {
    const fileName = 'random';

    const json = JSON.stringify({ pages: pages }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + '.json';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }, [pages, currentPageId]);

  if (state.isOpen) {
    return (
      <div style={state.style} className={styles.container}>
        <Button
          onClick={() => dispatch(flowActions.onAddNode({ type: NodeData.STRING_NODE, position: state.nodePosition }))}
        >
          Добавить текстовый инпут
        </Button>
        <Button
          onClick={() => dispatch(flowActions.onAddNode({ type: NodeData.CODE_NODE, position: state.nodePosition }))}
        >
          Добавить инпут под код
        </Button>
        <Button onClick={saveToFile}>Сохранить страницу</Button>
      </div>
    );
  }
};
