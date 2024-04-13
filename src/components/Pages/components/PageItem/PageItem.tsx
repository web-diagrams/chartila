import { useState } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch } from '@/app/hooks';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { Page } from '@/redux/flow/interfaces/flowStateInterfaces';

interface PageItemProps {
  page: Page;
}
const PageItem = ({ page }: PageItemProps) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [pageName, setPageName] = useState(page.pageName);

  return (
    <div className={styles.page_element} onDoubleClick={() => setIsOpen(true)}>
      {isOpen ? (
        <input
          className={styles.input}
          type="text"
          value={pageName}
          onChange={(e) => setPageName(e.target.value)}
          onBlur={() => {
            setIsOpen(false);
            dispatch(flowActions.onChangeNamePage({ id: page.id, name: pageName }));
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
