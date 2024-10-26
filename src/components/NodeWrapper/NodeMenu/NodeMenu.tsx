import { FC } from 'react';
import styles from './NodeMenu.module.scss';
import { useAppDispatch } from '@/app/hooks';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { useCurrentNode } from '@/hooks/useCurrentNode';

interface NodeMenuProps {
  nodeId: string;
}

export const NodeMenu: FC<NodeMenuProps> = (props) => {
  const { nodeId } = props;
  const dispatch = useAppDispatch();

  const node = useCurrentNode(nodeId);

  const onNodeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.currentTarget.value;
    dispatch(flowActions.onChangeNode({ id: nodeId, key: 'color', value: color, saveToHistory: false }));
  };
  const onNodeColorBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const color = e.currentTarget.value;
    dispatch(flowActions.onChangeNode({ id: nodeId, key: 'color', value: color, saveToHistory: true }));
  };

  return (
    <div className={styles.menu}>
      <input type="color" value={node?.data?.color} onChange={onNodeColorChange} onBlur={onNodeColorBlur} />
    </div>
  );
};
NodeMenu.displayName = 'NodeMenu';
