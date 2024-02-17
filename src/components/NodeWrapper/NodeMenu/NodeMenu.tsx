import { FC } from 'react';
import styles from './NodeMenu.module.scss';
import { IoMdColorPalette } from 'react-icons/io';
import { useAppDispatch } from '@/app/hooks';
import { flowActions } from '@/redux/flow/slice/flowSlice';

interface NodeMenuProps {
  nodeId: string;
}

export const NodeMenu: FC<NodeMenuProps> = (props) => {
  const { nodeId } = props;
  const dispatch = useAppDispatch();

  const onNodeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.currentTarget.value;
    dispatch(flowActions.onChangeNodeColor({ id: nodeId, color: color }));
  };

  return (
    <div className={styles.menu}>
      <input type="color" onChange={onNodeColorChange} />
    </div>
  );
};
NodeMenu.displayName = 'NodeMenu';
