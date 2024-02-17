import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import ModalWrapper from '@/components/ModalWrapper/ModalWrapper';
import styles from './styles.module.scss';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { classNames } from '@/utils';
import { NodeMenu } from './NodeMenu/NodeMenu';

type NodeWrapperProps = {
  isDoubleClick: boolean;
  id: string;
  children?: React.ReactNode;
  onDoubleClick?: () => void;
};

const NodeWrapper: FC<NodeWrapperProps> = memo(({ children, onDoubleClick, isDoubleClick, id }) => {
  const [isModal, setIsModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.code === 'Delete') {
        dispatch(flowActions.onDeleteNode(id));
      }
    },
    [id],
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e);
    switch (e.detail) {
      case 1:
        break;
      case 2:
        console.log('double click');
        onDoubleClick();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (isDoubleClick) {
          onDoubleClick();
        }
        if (isFocused) {
          setIsFocused(false);
        }
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  const onFocus = () => {
    setIsFocused(true);
  };

  return (
    <div
      ref={ref}
      onFocus={onFocus}
      onClick={handleClick}
      onMouseDown={(e) => console.log('down')}
      className={styles.node_wrapper}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {isModal && <ModalWrapper />}
      <div className={classNames(styles.node_wrapper_container, { [styles.focused]: isFocused }, [])}>
        {isFocused && <NodeMenu nodeId={id} />}
        <div className={styles.node_wrapper_children_container}>{children}</div>
        <BsThreeDotsVertical onClick={() => setIsModal(!isModal)} />
      </div>
    </div>
  );
});
NodeWrapper.displayName = 'NodeWrapper';
export default NodeWrapper;
