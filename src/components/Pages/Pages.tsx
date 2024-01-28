import { memo, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { getLastIndexOfQuestions } from '@/redux/flow/selectors/getCurrentPage';
import { getFlow } from '@/redux/flow/selectors/getFlow';
import PageItem from './components/PageItem/PageItem';

const Pages = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const { pages } = useSelector(getFlow);
  const currentPage = useSelector(getLastIndexOfQuestions);

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
