import React, { Dispatch, FC, SetStateAction, memo, useCallback, useMemo, useState } from 'react';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { docActions } from '@/redux/doc/slice/docSlice';
import { classNames } from '@/utils';
import { useCurrentNode } from '@/hooks/useCurrentNode';

type NodeWrapperProps = {
  id: string;
  children?: React.ReactNode;
  onHoveredChange: (isHovered: boolean) => void;
  setIsDoubleClicked: Dispatch<SetStateAction<boolean>>;
  isSelected: boolean;
};

const NodeWrapper: FC<NodeWrapperProps> = memo(({ children, id, onHoveredChange, setIsDoubleClicked, isSelected }) => {
  const dispatch = useDispatch();
  const node = useCurrentNode(id);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    switch (e.detail) {
      case 1: {
        if (!isSelected) {
          dispatch(docActions.onSelectNode(id));
        }
        break;
      }
    }
  };

  console.log(id);

  return (
    <div
      onClick={handleClick}
      className={styles.node_wrapper}
      tabIndex={0}
      onMouseEnter={() => onHoveredChange(true)}
      onMouseLeave={() => onHoveredChange(false)}
    >
      <div
        style={{ backgroundColor: node?.data?.color ?? 'white' }}
        onDoubleClick={() => setIsDoubleClicked(true)}
        className={classNames(styles.node_wrapper_container, { [styles.focused]: isSelected }, [])}
      >
        <div className={styles.node_wrapper_children_container}>{children}</div>
      </div>
    </div>
  );
});
NodeWrapper.displayName = 'NodeWrapper';
export default NodeWrapper;
