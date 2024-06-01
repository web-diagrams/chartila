import React, { Dispatch, FC, SetStateAction, memo, useCallback, useMemo, useState } from 'react';
import ModalWrapper from '@/components/ModalWrapper/ModalWrapper';
import styles from './styles.module.scss';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { classNames } from '@/utils';
import { NodeMenu } from './NodeMenu/NodeMenu';
import { useAppSelector } from '@/app/hooks';

type NodeWrapperProps = {
  id: string;
  children?: React.ReactNode;
  onHoveredChange: (isHovered: boolean) => void;
  setIsDoubleClicked: Dispatch<SetStateAction<boolean>>;
};

const NodeWrapper: FC<NodeWrapperProps> = memo(({ children, id, onHoveredChange, setIsDoubleClicked }) => {
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();
  const { selectedNodes } = useAppSelector((state) => state.flow);

  const isSelected = useMemo<boolean>(() => {
    return selectedNodes.includes(id);
  }, [selectedNodes]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.code === 'Delete') {
        dispatch(flowActions.onDeleteNode(id));
      }
    },
    [id],
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    switch (e.detail) {
      case 1: {
        if (!isSelected) {
          dispatch(flowActions.onSelectNode(id));
        }
        break;
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className={styles.node_wrapper}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => onHoveredChange(true)}
      onMouseLeave={() => onHoveredChange(false)}
    >
      {isModal && <ModalWrapper />}
      <div
        onDoubleClick={() => setIsDoubleClicked(true)}
        className={classNames(styles.node_wrapper_container, { [styles.focused]: isSelected }, [])}
      >
        {isSelected && <NodeMenu nodeId={id} />}
        <div className={styles.node_wrapper_children_container}>{children}</div>
        {/* Будем использовать в будущем */}
        {/* <BsThreeDotsVertical onClick={() => setIsModal(!isModal)} /> */}
      </div>
    </div>
  );
});
NodeWrapper.displayName = 'NodeWrapper';
export default NodeWrapper;
