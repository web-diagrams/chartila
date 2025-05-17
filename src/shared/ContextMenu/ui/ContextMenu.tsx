import { StateType, ContextOption } from '../model/contexMenuTypes';
import styles from './ContextMenu.module.scss';

type NodeContextMenuProps = {
  state: StateType;
  options: ContextOption[];
};

export const ContextMenu = ({ state, options }: NodeContextMenuProps) => {
  return (
    <div style={state.style} className={styles.container}>
      {options.map((option, i) => {
        if (option.type === 'button') {
          return (
            <div key={i} onClick={option.onClick} className={styles.contextItem}>
              {option.icon ?? null}
              {option.label && <p>{option.label}</p>}
            </div>
          )
        }
        if (option.type === 'divider') {
          return <hr />;
        }
      })}
    </div>
  );
};
