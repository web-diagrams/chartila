import React, {FC, memo, useEffect, useRef, useState} from "react";
import ModalWrapper from "@/components/ModalWrapper/ModalWrapper";
import styles from './styles.module.scss';
import { BsThreeDotsVertical } from "react-icons/bs";

type NodeWrapperProps = {
    isDoubleClick: boolean,
    setIsDoubleClick: (value: boolean) => void,
    children?: React.ReactNode,
    onDoubleClick?: () => void,
}

const NodeWrapper: FC<NodeWrapperProps> = memo(({
    children, onDoubleClick, isDoubleClick, setIsDoubleClick
}) => {
    const [isModal, setIsModal] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (isDoubleClick && ref.current && !ref.current.contains(event.target)) {
                setIsDoubleClick(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    });
    return (
        <div ref={ref} onDoubleClick={onDoubleClick}>
            {isModal && <ModalWrapper />}
            <div className={styles.node_wrapper_container}>
                <div className={styles.node_wrapper_children_container}>
                    {children}
                </div>
                <BsThreeDotsVertical onClick={() => setIsModal(!isModal)} />
            </div>
        </div>
    );
})
NodeWrapper.displayName = 'NodeWrapper'
export default NodeWrapper