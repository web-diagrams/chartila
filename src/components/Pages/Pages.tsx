import { memo, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import PageItem from './components/PageItem/PageItem';
import { useAppSelector } from '@/app/hooks';
import { useCurrentPage } from '@/hooks/useCurrentPage';

const Pages = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const { pages, currentPageId } = useAppSelector((state) => state.flow);

  const currentPage = useCurrentPage(pages, currentPageId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <div className={styles.lists_container}>
      <div ref={ref}>
        <div className={styles.lists_select_element} onClick={() => setIsOpen(!isOpen)}>
          {currentPage?.pageName}
        </div>
        {isOpen &&
          pages.map((item) => <PageItem key={item.id} itemId={item.id} name={item.pageName} setIsOpen={setIsOpen} />)}
      </div>
    </div>
  );
});
Pages.displayName = 'Pages';

export default Pages;
