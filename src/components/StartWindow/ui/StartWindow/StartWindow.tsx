import React, { FC, memo } from 'react';
import s from './StartWindow.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import { ServerButton } from '../ServerButton/ServerButton';
import { useStartNewDoc } from '@/hooks/useStartNewDoc';
import { UploadButton } from '../UploadButton/UploadButton';

const StartWindow: FC = memo(() => {
  const { onStartNewProject } = useStartNewDoc();

  return (
    <Modal title='Начало работы'>
      <ul className={s.list}>
        <li className={s.listItem}>
          <UploadButton />
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
