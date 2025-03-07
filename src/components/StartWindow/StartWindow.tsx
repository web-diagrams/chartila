import React, { FC, memo } from 'react';
import s from './StartWindow.module.scss';
import { useAppDispatch } from '@/app/hooks';
import { classNames } from '@/utils';
import { flowActions } from '@/redux/flow/slice/flowSlice';
import { uploadFile } from '@/redux/flow/services/uploadFile';
import { useAuth } from '@/app/providers/AuthProvider';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { getLoginPath } from '@/shared/config/routePaths';

const StartWindow: FC = memo(() => {
  const navigate = useNavigate();
  const { isAuth, onLogout: onResetAuth } = useAuth();
  const dispatch = useAppDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(uploadFile(e.target.files));
    }
  }

  const onStartNewProject = () => {
    dispatch(flowActions.onInitState());
  }

  const onAuthClick = () => {
    const path = getLoginPath()
    navigate(path);
  }

  const onLogout = () => {
    if (isAuth) {
      document.cookie = "user-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      onResetAuth && onResetAuth();
    }
  }

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
        <li className={s.listItem}>
          {isAuth
            ? (
              <>
                <button onClick={onStartNewProject} className={classNames(s.button, {}, [s.button_type_label])}>
                  Выбрать график
                </button>
                <button onClick={onLogout} className={classNames(s.button, {}, [s.button_type_label])}>
                  Выйти
                </button>
              </>
            )
            : (
              <button onClick={onAuthClick} className={classNames(s.button, {}, [s.button_type_label])}>
                Авторизоваться
              </button>
            )
          }
        </li>
      </ul>
    </Modal >
  );
});
StartWindow.displayName = 'StartWindow';
export default StartWindow;
