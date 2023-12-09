import React, {FC, memo, useState} from "react";
import ModalWrapper from "@/components/ModalWrapper/ModalWrapper";

type NodeWrapperProps = {
    children?: React.ReactNode,
    onDoubleClick?: () => void,
    ref?:  React.MutableRefObject<any>
}

const NodeWrapper: FC<NodeWrapperProps> = memo(({
    children, onDoubleClick, ref
}) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div ref={ref} onDoubleClick={onDoubleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {isHovered && <ModalWrapper />}
            <div style={{backgroundColor: 'white', border: '1px solid #777', padding: 10, position: 'relative'}}>
                {children}
            </div>
        </div>
    );
})
NodeWrapper.displayName = 'NodeWrapper'
export default NodeWrapper