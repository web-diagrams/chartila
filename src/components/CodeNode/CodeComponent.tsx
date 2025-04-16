import React, { FC, memo, useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import 'reactflow/dist/style.css';
import styles from './CodeNode.module.scss';
import { classNames } from '@/utils';

type CodeComponentProps = {
  code: string;
};

const CodeComponent: FC<CodeComponentProps> = memo(({ code }) => {
  const codeBlockRef = useRef(null);
  useEffect(() => {
    hljs.highlightBlock(codeBlockRef.current ?? document.createElement('code'));
  }, [codeBlockRef]);

  return (
    <pre className="nodrag">
      <code ref={codeBlockRef} className={classNames('language-javascript nodrag nopan', {}, [styles.node])}>
        {code}
      </code>
    </pre>
  );
});
CodeComponent.displayName = 'CodeComponent';
export default CodeComponent;
