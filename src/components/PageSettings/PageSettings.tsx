import { useAppDispatch, useAppSelector } from '@/app/hooks';
import styles from './PageSettings.module.scss';
import { docActions } from '@/redux/doc/slice/docSlice';

export const PageSettings = () => {
  const dispatch = useAppDispatch();
  const { docName } = useAppSelector(state => state.doc);

  const onChangeDocName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(docActions.onChangeDocName(e.target.value));
  }

  return (
    <div className={styles.container}>
      <input
        placeholder='Имя документа'
        value={docName}
        onChange={onChangeDocName}
      />
    </div>
  );
};
