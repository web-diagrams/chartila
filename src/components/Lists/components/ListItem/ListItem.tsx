// eslint-disable-next-line prettier/prettier
import { useCallback } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { FaCheck } from 'react-icons/fa';
import { batch } from 'react-redux';
import { dtoToFlow } from '@/redux/flow/flowUtils';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { listActions } from '@/redux/list/listSlice';

interface ListItemProps {
  itemId: string;
  name: string;
  setIsOpen: (e: boolean) => void;
}
const ListItem = ({ itemId, name, setIsOpen }: ListItemProps) => {
  const { id, pages } = useAppSelector((state) => state.list);
  const dispatch = useAppDispatch();
  const flowState = useAppSelector((state) => state.flow);

  const { onUpdateState } = flowActions;
  const { changePage } = listActions;

  const onClick = useCallback(() => {
    batch(() => {
      dispatch(changePage({ newID: itemId, flowState: flowState }));
      // из-за этого данные на странице пропадают при клике на страницу (когда она одна)
      dispatch(onUpdateState(dtoToFlow(pages.find((page) => page.id === itemId))));
    });
    setIsOpen(false);
  }, []);

  return (
    <div onClick={onClick} className={styles.list_item}>
      <div>{name}</div>
      {itemId === id && <FaCheck style={{ marginLeft: '5px' }} fill={'green'} />}
    </div>
  );
};

export default ListItem;
