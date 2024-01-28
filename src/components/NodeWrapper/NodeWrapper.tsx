import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import ModalWrapper from '@/components/ModalWrapper/ModalWrapper';
import styles from './styles.module.scss';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { flowActions } from '@/redux/flow/slice/flowSlice';

type NodeWrapperProps = {
  isDoubleClick: boolean;
  setIsDoubleClick: (value: boolean) => void;
  id: string;
  children?: React.ReactNode;
  onDoubleClick?: () => void;
};

const NodeWrapper: FC<NodeWrapperProps> = memo(({ children, onDoubleClick, isDoubleClick, setIsDoubleClick, id }) => {
  const [isModal, setIsModal] = useState(false);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDoubleClick && ref.current && !ref.current.contains(event.target)) {
        setIsDoubleClick(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <div ref={ref} onDoubleClick={onDoubleClick} tabIndex={0} onKeyDown={onKeyDown}>
      {isModal && <ModalWrapper />}
      <div className={styles.node_wrapper_container}>
        <div className={styles.node_wrapper_children_container}>{children}</div>
        <BsThreeDotsVertical onClick={() => setIsModal(!isModal)} />
      </div>
    </div>
  );
});
NodeWrapper.displayName = 'NodeWrapper';
export default NodeWrapper;
