import { StateType, ContextOption } from '../model/contexMenuTypes';
import styles from './ContextMenu.module.scss';
import { PropsWithChildren } from 'react';

type NodeContextMenuProps = {
  state: StateType;
  options: ContextOption[];
};

export const ContextMenu = ({ state, options }: PropsWithChildren<NodeContextMenuProps>) => {
  if (state.isOpen && !state.isNode) {
    return (
      <div style={state.style} className={styles.container}>
        {options.map((option, i) => (
          <div key={i} onClick={option.onClick} className={styles.contextItem}>
            {option.icon ?? null}
            {option.label && <p>{option.label}</p>}
          </div>
        ))}
      </div>
    );
  }
};
