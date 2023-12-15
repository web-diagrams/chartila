import React, { ChangeEvent, FC, memo, useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import NodeWrapper from '../NodeWrapper/NodeWrapper';
import { useAppDispatch } from '@/app/hooks';
import s from './StringNode.module.scss'
import { IStringNode } from '@/redux/flow/interfaces/flowStateInterfaces';
import { flowActions } from '@/redux/flow/slice/flowSlice';

type StringNodeProps = {
    data: IStringNode
}

const StringNode: FC<StringNodeProps> = memo(({ data }) => {
    const dispatch = useAppDispatch()
    const [isDoubleClick, setIsDoubleClick] = useState(false);
    const [v, setV] = useState<string>('')

    const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        setV(_ => value)
    }, [v])
    const handleDoubleClick = () => {
        setIsDoubleClick(true)
    }

    useEffect(() => {
        if (data?.value) {
            setV(_ => data.value)
        }
    }, [data.value])

    return (
        <NodeWrapper
            id={data.id}
            onDoubleClick={handleDoubleClick}
            isDoubleClick={isDoubleClick}
            setIsDoubleClick={setIsDoubleClick}
        >
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            {isDoubleClick ? (
                <textarea
                    className={s.stringInput}
                    value={v}
                    onBlur={(e) => {
                        dispatch(flowActions.onChangeStringNode({ id: data.id, value: e.currentTarget.value }))
                        setIsDoubleClick(false)
                    }}
                    onChange={onChange}
                />
            ) : <div>{v}</div>}
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{ background: '#555' }}
            />
        </NodeWrapper>
    );
});
StringNode.displayName = 'StringNode'

export default StringNode