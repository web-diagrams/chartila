import { StateType } from '../model/contexMenuTypes';
import styles from './NodeContextMenu.module.scss';
import { useAppDispatch } from '@/app/hooks';
import { Button } from '@/shared/ui/Button/Button';
import { docActions } from '@/redux/doc/slice/docSlice';
import { NodeData } from '@/redux/doc/constants/constants';

type NodeContextMenuProps = {
  state: StateType;
};

export const NodeContextMenu = ({ state }: NodeContextMenuProps) => {
  const dispatch = useAppDispatch();

  if (state.isOpen) {
    return (
      <div style={state.style} className={styles.container}>
        <Button
          onClick={() => dispatch(docActions.onAddNode({ type: NodeData.STRING_NODE, position: state.nodePosition }))}
        >
          Добавить текстовый инпут
        </Button>
        <Button
          onClick={() => dispatch(docActions.onAddNode({ type: NodeData.CODE_NODE, position: state.nodePosition }))}
        >
          Добавить инпут под код
        </Button>
      </div>
    );
  }
};
