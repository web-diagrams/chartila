import React, { Dispatch, FC, SetStateAction, memo } from 'react';
import { classNames } from '@/utils';
import { TextNodeData } from '@/redux/flow/interfaces/flowStateInterfaces';
import styles from '../CustomNode/CustomeNode.module.scss';
import style from './TextNode.module.scss';
import { useAppDispatch } from '@/app/hooks';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { useText } from '@/hooks/useText';

type TextNodeProps = {
  data: TextNodeData;
  isDoubleClicked: boolean;
  setIsDoubleClicked: Dispatch<SetStateAction<boolean>>;
};

const TextNode: FC<TextNodeProps> = memo(({ data, isDoubleClicked, setIsDoubleClicked }) => {
  const dispatch = useAppDispatch();
  const { text, onChange, textWidth } = useText(data.text);

  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    dispatch(flowActions.onChangeNode({ id: data.id, key: 'text', value: e.currentTarget.value }));
    setIsDoubleClicked(false);
  };

  return (
    <textarea
      style={{ width: `${textWidth}px` }}
      rows={text.split('\n').length}
      className={classNames(styles.customNode, {}, [style.textNode, 'nodrag'])}
      value={text}
      onBlur={onBlur}
      onChange={onChange}
      readOnly={!isDoubleClicked}
    />
  );
});
TextNode.displayName = 'TextNode';
export default TextNode;
