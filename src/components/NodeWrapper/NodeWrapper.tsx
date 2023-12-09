import React, { FC, memo } from "react";

type NodeWrapperProps = {
    children?: React.ReactNode,
}

const NodeWrapper: FC<NodeWrapperProps> = memo(({
    children,
}) => {
    return (
        <div style={{ backgroundColor: 'white', border: '1px solid #777', padding: 10 }}>
            {children}
        </div>
    )
})
NodeWrapper.displayName = 'NodeWrapper'
export default NodeWrapper