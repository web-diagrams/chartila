import { useState } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch } from '@/app/hooks';
import { docActions } from '@/redux/doc/slice/docSlice';
import { Page } from '@/redux/doc/interfaces/docStateInterfaces';
import { useGetDocState } from '@/redux/doc/hooks/useGetDocState';
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from '@/shared/ui/Button/Button';

interface PageItemProps {
  page: Page;
}
const PageItem = ({ page }: PageItemProps) => {
  const { currentPageId, pages } = useGetDocState();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [pageName, setPageName] = useState(page.pageName);

  const isCurrentPageId = page.id === currentPageId;

  const onSelectPage = () => {
    dispatch(docActions.onSelectPage(page.id))
  }

  const onDeletePage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(docActions.onDeletePage({ pageId: page.id }));
  }

  return (
    <div
      className={styles.page_element}
      onClick={onSelectPage}
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
        <div className={styles.pageContent}>
          <div>{page.pageName}</div>
          <Button
            onClick={onDeletePage}
            withoutBG
            withoutPadding
            disabled={pages.length === 1}
          >
            <FaRegTrashAlt size={12} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PageItem;
