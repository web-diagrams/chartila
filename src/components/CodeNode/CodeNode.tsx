import React, { FC, memo } from 'react';
import { classNames } from '@/utils';
import { CodeNodeData } from '@/redux/flow/interfaces/flowStateInterfaces';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import styles from '../CustomNode/CustomeNode.module.scss';
import CodeComponent from './CodeComponent';

type CodeNodeProps = {
  data: CodeNodeData;
};

const a = 'for(let i = 0; i < 10; i++){\n' + '    console.log(i)\n' + '  }';

const CodeNode: FC<CodeNodeProps> = memo(({ data }) => {
  return (
    <>
      <div className={classNames('', { [styles.inputWrapper]: data.isWrapped }, [])}>
        {/*<textarea*/}
        {/*  rows={data.isWrapped ? 1 : text.split('\n').length}*/}
        {/*  className={classNames(styles.codeInput)}*/}
        {/*  value={text}*/}
        {/*  onChange={onChange}*/}
        {/*/>*/}
        {/* P */}
        <CodeComponent code={a} />
      </div>
      <button className={styles.wrapButton}>{data.isWrapped ? <IoIosArrowDown /> : <IoIosArrowUp />}</button>
    </>
  );
});
CodeNode.displayName = 'CodeNode';
export default CodeNode;
