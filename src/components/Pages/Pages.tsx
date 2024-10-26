import styles from './styles.module.scss';
import PageItem from './components/PageItem/PageItem';
import { useAppDispatch } from '@/app/hooks';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { FaPlus } from 'react-icons/fa6';
import Button from '@/shared/ui/Button';
import { useGetFlowState } from '@/redux/flow/hooks/useGetFlowState';

const Pages = () => {
  const { pages } = useGetFlowState();
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
