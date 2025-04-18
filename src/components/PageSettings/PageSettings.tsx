import styles from './PageSettings.module.scss';
import { ChangeDocName } from './ui/ChangeDocName';

export const PageSettings = () => {
  return (
    <div className={styles.container}>
      <ChangeDocName />
    </div>
  );
};
