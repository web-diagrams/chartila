import React from 'react';
import { Node } from 'reactflow';
import styles from './FloatingToolbar.module.scss';
import { NodeAlignment } from './ui/NodeAlignment';

type Props = {
  selectedNodes: Node[];
};

export const FloatingToolbar: React.FC<Props> = ({ selectedNodes }) => {
  if (selectedNodes.length === 0) return null;

  return (
    <div className={styles.toolbar}>
      <NodeAlignment />
    </div>
  );
};
