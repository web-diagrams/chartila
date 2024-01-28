import React, { ChangeEvent, FC, memo, useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import NodeWrapper from '../NodeWrapper/NodeWrapper';
import { useAppDispatch } from '@/app/hooks';
import s from './CodeNode.module.scss';
import { classNames } from '@/utils';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { ICodeNode } from '@/redux/flow/interfaces/flowStateInterfaces';
import { flowActions } from '@/redux/flow/slice/flowSlice';

type CodeNodeProps = {
  data: ICodeNode;
};

const CodeNode: FC<CodeNodeProps> = memo(({ data }) => {
  const dispatch = useAppDispatch();
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [v, setV] = useState<string>('');

  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.currentTarget.value;
      setV(() => value);
    },
    [v],
  );

  const handleDoubleClick = () => {
    setIsDoubleClick(true);
  };

  useEffect(() => {
    if (data?.value) {
      setV(() => data.value);
    }
  }, [data.value]);

  return (
    <NodeWrapper
      id={data.id}
      onDoubleClick={handleDoubleClick}
      isDoubleClick={isDoubleClick}
      setIsDoubleClick={setIsDoubleClick}
    >
      <Handle type="target" position={Position.Left} onConnect={(params) => console.log('handle onConnect', params)} />
      <div className={classNames(s.container)}>
        {isDoubleClick ? (
          <>
            <div className={classNames('', { [s.inputWrapper]: data.isWrapped }, [])}>
              <textarea
                rows={data.isWrapped ? 1 : v.split('\n').length}
                className={classNames(s.codeInput)}
                value={v}
                onBlur={(e) =>
                  dispatch(flowActions.onChangeCodeNode({ id: data.id, key: 'value', value: e.currentTarget.value }))
                }
                onChange={onChange}
              />
            </div>
            <button
              className={s.wrapButton}
              onClick={() =>
                dispatch(flowActions.onChangeCodeNode({ id: data.id, key: 'isWrapped', value: !data.isWrapped }))
              }
            >
              {data.isWrapped ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </button>
          </>
        ) : (
          <div>{v}</div>
        )}
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </NodeWrapper>
  );
});
CodeNode.displayName = 'CodeNode';

export default CodeNode;
