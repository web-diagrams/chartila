import React, { FC, memo } from 'react';
import s from './StartWindow.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import { ServerButton } from '../ServerButton/ServerButton';
import { UploadButton } from '../UploadButton/UploadButton';
import { NewDocButton } from '../NewDocButton/NewDocButton';

const StartWindow: FC = memo(() => {

  return (
    <Modal title='Начало работы'>
      <ul className={s.list}>
        <li className={s.listItem}>
          <NewDocButton />
        </li>
        <li className={s.listItem}>
          <UploadButton />
        </li>
        <ServerButton />
      </ul>
    </Modal >
  );
});

StartWindow.displayName = 'StartWindow';
export default StartWindow;
