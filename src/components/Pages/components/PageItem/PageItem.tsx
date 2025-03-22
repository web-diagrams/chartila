import { useState } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch } from '@/app/hooks';
import { docActions } from '@/redux/doc/slice/docSlice';
import { Page } from '@/redux/doc/interfaces/docStateInterfaces';
import { useGetDocState } from '@/redux/doc/hooks/useGetDocState';

interface PageItemProps {
  page: Page;
}
const PageItem = ({ page }: PageItemProps) => {
  const { currentPageId } = useGetDocState();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [pageName, setPageName] = useState(page.pageName);

  const isCurrentPageId = page.id === currentPageId;

  return (
    <div
      className={styles.page_element}
      onClick={() => dispatch(docActions.onSelectPage(page.id))}
      onDoubleClick={() => setIsOpen(true)}
      style={{ background: isCurrentPageId ? 'lightgray' : '' }}
    >
      {isOpen ? (
        <input
          className={styles.input}
          type="text"
          value={pageName}
          onChange={(e) => setPageName(e.target.value)}
          onBlur={() => {
            setIsOpen(false);
            dispatch(docActions.onChangePageName({ id: page.id, name: pageName }));
          }}
          autoFocus
        />
      ) : (
        <div>{page.pageName}</div>
      )}
    </div>
  );
};

export default PageItem;
