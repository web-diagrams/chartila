import { memo, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import ListItem from '@/components/Lists/components/ListItem/ListItem';
import { useAppSelector } from '@/app/hooks';
const Lists = memo(() => {
  const { id, pages } = useAppSelector((state) => state.list);

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

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
          {pages.find((page) => page.id === id)?.pageName}
        </div>
        {isOpen &&
          pages.map((item) => <ListItem key={item.id} itemId={item.id} name={item.pageName} setIsOpen={setIsOpen} />)}
      </div>
    </div>
  );
});
Lists.displayName = 'Lists';

export default Lists;
