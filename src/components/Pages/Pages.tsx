import styles from './styles.module.scss';
import PageItem from './components/PageItem/PageItem';
import { useAppDispatch } from '@/app/hooks';
import { docActions } from '@/redux/doc/slice/docSlice';
import { FaPlus } from 'react-icons/fa6';
import Button from '@/shared/ui/Button';
import { useGetDocState } from '@/redux/doc/hooks/useGetDocState';

const Pages = () => {
  const { pages } = useGetDocState();
  const dispatch = useAppDispatch();

  return (
    <div className={styles.pages_container}>
      {pages.map((page) => (
        <PageItem key={page.id} page={page} />
      ))}
      <Button onClick={() => dispatch(docActions.onAddPage())}>
        <FaPlus />
      </Button>
    </div>
  );
};

export default Pages;
