import React, { memo } from 'react';
import styles from './FloatingToolbar.module.scss';
import { NodeAlignment } from './ui/NodeAlignment';

type Props = {
  selectedNodesLength: number;
};

export const FloatingToolbar: React.FC<Props> = memo(({ selectedNodesLength }) => {
  if (selectedNodesLength === 0) return null;

  return (
    <div className={styles.toolbar}>
      <NodeAlignment />
    </div>
  );
});
