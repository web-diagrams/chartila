import { StateType } from '../model/contexMenuTypes';
import styles from './ContextMenu.module.scss';
import { useAppDispatch } from '@/app/hooks';
import Button from '@/shared/ui/Button';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { NodeData } from '@/redux/flow/constants/constants';
import { useSaveToFile } from '@/shared/hooks/useSaveToFile';

type ContextMenuProps = {
  state: StateType;
};

export const ContextMenu = ({ state }: ContextMenuProps) => {
  const dispatch = useAppDispatch();

  const { onSave: saveToFile } = useSaveToFile();

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
