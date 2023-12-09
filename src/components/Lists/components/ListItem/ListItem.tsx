import React from 'react';
import styles from './styles.module.scss';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import { FaCheck } from "react-icons/fa";
import {setId} from "@/redux/listSlice/listSlice";

interface ListItemProps {
    iteIid: string;
    name: string;
    setIsOpen: (e: boolean) => void;
}
const ListItem = ({ iteIid, name, setIsOpen }: ListItemProps)  => {
    const {id} = useAppSelector(state => state.list);
    const dispatch = useAppDispatch();
    return (
        <div
            onClick={() => {
                dispatch(setId(iteIid))
                setIsOpen(false)}
            }
            className={styles.list_item}
        >
            <div>{name}</div>
            {iteIid === id && <FaCheck style={{ marginLeft: '5px' }} fill={'green'} />}
        </div>
    );
};

export default ListItem;