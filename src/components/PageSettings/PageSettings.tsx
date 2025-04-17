import styles from './PageSettings.module.scss';
import { ChangeDocName } from './ui/ChangeDocName';
import { NodeAlignment } from './ui/NodeAlignment';

export const PageSettings = () => {
  return (
    <div className={styles.container}>
      <ChangeDocName />
      <NodeAlignment />
    </div>
  );
};
