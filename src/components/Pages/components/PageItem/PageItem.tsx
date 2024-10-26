import { useState } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch } from '@/app/hooks';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { Page } from '@/redux/flow/interfaces/flowStateInterfaces';
import { useGetFlowState } from '@/redux/flow/hooks/useGetFlowState';

interface PageItemProps {
  page: Page;
}
const PageItem = ({ page }: PageItemProps) => {
  const { currentPageId } = useGetFlowState();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [pageName, setPageName] = useState(page.pageName);

  const isCurrentPageId = page.id === currentPageId;

  return (
    <div
      className={styles.page_element}
      onClick={() => dispatch(flowActions.onChangePage(page.id))}
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
            dispatch(flowActions.onChangePageName({ id: page.id, name: pageName }));
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
