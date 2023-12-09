import {useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss';
import ListItem from "@/components/Lists/components/ListItem/ListItem";
import {useAppSelector} from "@/app/hooks";
const items = [
    {
        id: '0',
        name: 'List 1',
    },
    {
        id: '1',
        name: 'List 2',
    },
    {
        id: '2',
        name: 'List 3',
    }
]
const Lists = () => {
    const { id } = useAppSelector((state) => state.list);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    })
    console.log(isOpen)
    return (
        <div className={styles.lists_container}>
            <div ref={ref}>
                <div className={styles.lists_select_element} onClick={() => setIsOpen(!isOpen)}>
                    {items.find(value => value.id === id)?.name}
                </div>
                {isOpen && items.map((item) => <ListItem key={item.id} iteIid={item.id} name={item.name} setIsOpen={setIsOpen} />)}
            </div>
        </div>
    );
};

export default Lists;