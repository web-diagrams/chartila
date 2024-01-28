// eslint-disable-next-line prettier/prettier
import { useCallback } from 'react';
import styles from './styles.module.scss';
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getFlow } from '@/redux/flow/selectors/getFlow';
import { useAppDispatch } from '@/app/hooks';
import { flowActions } from '@/redux/flow/slice/flowSlice';

interface PageItemProps {
  itemId: string;
  name: string;
  setIsOpen: (e: boolean) => void;
}
const PageItem = ({ itemId, name, setIsOpen }: PageItemProps) => {
  const dispatch = useAppDispatch();
  const { currentPageId } = useSelector(getFlow);

  const onClick = useCallback(() => {
    dispatch(flowActions.onChangePage(itemId));
    setIsOpen(false);
  }, []);

  return (
    <div onClick={onClick} className={styles.list_item}>
      <div>{name}</div>
      {itemId === currentPageId && <FaCheck style={{ marginLeft: '5px' }} fill={'green'} />}
    </div>
  );
};
PageItem.displayName = 'PageItem';

export default PageItem;
