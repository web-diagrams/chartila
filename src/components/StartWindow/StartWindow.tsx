import React, { FC, memo } from 'react';
import s from './StartWindow.module.scss';
import { useAppDispatch } from '@/app/hooks';
import { classNames } from '@/utils';
import { uploadFile } from '@/redux/flow/services/uploadFile';
import { Modal } from '@/shared/ui/Modal/Modal';
import { ServerButton } from './ServerButton';
import { useStartNewDoc } from '@/hooks/useStartNewDoc';

const StartWindow: FC = memo(() => {
  const dispatch = useAppDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(uploadFile(e.target.files));
    }
  }

  const { onStartNewProject } = useStartNewDoc();

  return (
    <Modal title='Начало работы'>
      <ul className={s.list}>
        <li className={s.listItem}>
          <label className={classNames(s.button, {}, [s.button_type_label])}>
            <input onInput={handleFileChange} type="file" />
            Загрузить с компьютера
          </label>
        </li>
        <li className={s.listItem}>
          <button onClick={onStartNewProject} className={s.button}>
            Создать новый
          </button>
        </li>
        <ServerButton />
      </ul>
    </Modal >
  );
});

StartWindow.displayName = 'StartWindow';
export default StartWindow;
