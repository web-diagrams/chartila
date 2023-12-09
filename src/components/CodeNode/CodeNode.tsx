import React, { FC, memo } from 'react';
import { Handle, Position } from 'reactflow';
import NodeWrapper from '../NodeWrapper/NodeWrapper';

const CodeNode: FC = memo(() => {
    return (
        <NodeWrapper>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            // isConnectable={isConnectable}
            />
            {/* <div>
                Custom Color Picker Node: <strong>{data.color}</strong>
            </div> */}
            <input className="nodrag" type="color" />
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{ top: 10, background: '#555' }}
            // isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="b"
                style={{ bottom: 10, top: 'auto', background: '#555' }}
            // isConnectable={isConnectable}
            />
        </NodeWrapper>
    );
});
CodeNode.displayName = 'CodeNode'

export default CodeNode