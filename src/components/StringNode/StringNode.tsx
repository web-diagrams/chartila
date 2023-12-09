import React, { ChangeEvent, FC, memo, useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import NodeWrapper from '../NodeWrapper/NodeWrapper';
import { IStringNode } from '@/redux/flowSlice/interface';
import { useAppDispatch } from '@/app/hooks';
import { flowActions } from '@/redux/flowSlice/flowSlice';
import s from './StringNode.module.scss'

type StringNodeProps = {
    data: IStringNode
}

const StringNode: FC<StringNodeProps> = memo(({ data }) => {

    const dispatch = useAppDispatch()

    const [v, setV] = useState<string>('')

    const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        setV(_ => value)
    }, [v])

    useEffect(() => {
        if (data?.value) {
            setV(_ => data.value)
        }
    }, [data.value])

    return (
        <NodeWrapper>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            // isConnectable={isConnectable}
            />
            {/* <input
                className="nodrag"
                type="text"
                value={v}
                onBlur={(e) => dispatch(flowActions.onStringNodeChange({ id: data.id, value: e.currentTarget.value }))}
                onChange={onChange}
            /> */}
            <textarea
                className={s.stringInput}
                value={v}
                onBlur={(e) => dispatch(flowActions.onStringNodeChange({ id: data.id, value: e.currentTarget.value }))}
                onChange={onChange}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{ background: '#555' }}
            // isConnectable={isConnectable}
            />
        </NodeWrapper>
    );
});
StringNode.displayName = 'StringNode'

export default StringNode