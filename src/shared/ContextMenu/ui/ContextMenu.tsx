import { StateType } from '../model/contexMenuTypes';
import styles from './ContextMenu.module.scss';
import { PropsWithChildren } from 'react';

type NodeContextMenuProps = {
  state: StateType;
};

export const ContextMenu = ({ state, children }: PropsWithChildren<NodeContextMenuProps>) => {
  if (state.isOpen && !state.isNode) {
    return (
      <div style={state.style} className={styles.container}>
        {children}
      </div>
    );
  }
};
