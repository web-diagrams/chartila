import styles from './styles.module.scss';
import PageItem from './components/PageItem/PageItem';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { FaPlus } from 'react-icons/fa6';
import Button from '@/shared/ui/Button';

const Pages = () => {
  const { pages } = useAppSelector((state) => state.flow);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.pages_container}>
      {pages.map((page) => (
        <PageItem key={page.id} page={page} />
      ))}
      <Button onClick={() => dispatch(flowActions.onAddPage())}>
        <FaPlus />
      </Button>
    </div>
  );
};

export default Pages;
