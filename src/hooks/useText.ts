import { ChangeEvent, useEffect, useMemo, useState } from 'react';

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

    number = tempElement.offsetWidth ? tempElement.offsetWidth + 2 : 10;
    tempElement.remove();
    return number;
  }, [text]);

  useEffect(() => {
    if (text) {
      setText(textValue);
    }
  }, [textValue]);

  return {
    text,
    onChange,
    textWidth,
  };
};
