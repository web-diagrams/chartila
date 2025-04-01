import { memo, useState } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch } from '@/app/hooks';
import { docActions } from '@/redux/doc/slice/docSlice';
import { Page } from '@/redux/doc/interfaces/docStateInterfaces';
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from '@/shared/ui/Button/Button';

interface PageItemProps extends Page {
  countOfPages: number;
  isCurrentPageId: boolean;
  onSelectPage: (id: string) => void;
  onDeletePage: (pageId: string) => void;
}

const PageItem = memo(({ id, pageName, countOfPages, isCurrentPageId, onSelectPage, onDeletePage }: PageItemProps) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(pageName);

  const onSelectPageCb = () => {
    onSelectPage(id);
  }

  const onDeletePageCb = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDeletePage(id);
  }

  const onBlur = () => {
    setIsOpen(false);
    dispatch(docActions.onChangePageName({ id, name: pageName }));
  }

  return (
    <div
      className={styles.page_element}
      onClick={onSelectPageCb}
      onDoubleClick={() => setIsOpen(true)}
      style={{ background: isCurrentPageId ? 'lightgray' : '' }}
    >
      {isOpen ? (
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={onBlur}
          autoFocus
        />
      ) : (
        <div className={styles.pageContent}>
          <div>{inputValue}</div>
          <Button
            onClick={onDeletePageCb}
            withoutBG
            withoutPadding
            disabled={countOfPages === 1}
          >
            <FaRegTrashAlt size={12} />
          </Button>
        </div>
      )}
    </div>
  );
});

export default PageItem;
