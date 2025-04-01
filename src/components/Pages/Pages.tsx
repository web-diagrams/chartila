import styles from './styles.module.scss';
import PageItem from './components/PageItem/PageItem';
import { useAppDispatch } from '@/app/hooks';
import { docActions } from '@/redux/doc/slice/docSlice';
import { FaPlus } from 'react-icons/fa6';
import { Button } from '@/shared/ui/Button/Button';
import { useGetDocState } from '@/redux/doc/hooks/useGetDocState';
import { useCallback } from 'react';

const Pages = () => {
  const { pages, currentPageId } = useGetDocState();
  const dispatch = useAppDispatch();

  const onSelectPage = useCallback((id: string) => {
    dispatch(docActions.onSelectPage(id))
  }, [dispatch])

  const onDeletePage = useCallback((id: string) => {
    dispatch(docActions.onDeletePage({ pageId: id }));
  }, [dispatch])

  return (
    <div className={styles.pages_container}>
      {pages.map((page) => (
        <PageItem
          key={page.id}
          countOfPages={pages.length}
          isCurrentPageId={page.id === currentPageId}
          onSelectPage={onSelectPage}
          onDeletePage={onDeletePage}
          {...page}
        />
      ))}
      <Button onClick={() => dispatch(docActions.onAddPage())}>
        <FaPlus />
      </Button>
    </div>
  );
};

export default Pages;
