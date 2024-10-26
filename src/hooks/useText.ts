import { ChangeEvent, useEffect, useMemo, useState } from 'react';

const DEFAULT_NODE_WIDTH = 10;
const DEFAULT_NODE_GAP = 2;

export const useText = (textValue: string) => {
  const [text, setText] = useState<string>(textValue);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setText(value);
  };

  const textWidth = useMemo(() => {
    let number = 0;
    const tempElement = document.createElement('span');
    const maxText = text.split('\n').reduce((longest, word) => {
      return word.length > longest.length ? word : longest;
    });
    tempElement.textContent = maxText;
    tempElement.style.visibility = 'hidden';
    tempElement.style.fontSize = '12px';
    document.body.appendChild(tempElement);

    number = tempElement.offsetWidth ? tempElement.offsetWidth + DEFAULT_NODE_GAP : DEFAULT_NODE_WIDTH;
    tempElement.remove();
    return number;
  }, [text]);

  useEffect(() => {
    if (typeof textValue === 'string') {
      setText(textValue);
    }
  }, [textValue]);

  return {
    text,
    onChange,
    textWidth,
  };
};
