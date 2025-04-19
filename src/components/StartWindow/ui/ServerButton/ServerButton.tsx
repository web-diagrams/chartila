import { useAuth } from "@/app/providers/AuthProvider";
import { getDocsPagePath, getLoginPath } from "@/shared/config/routePaths";
import { classNames } from "@/utils";
import { useNavigate } from "react-router-dom";
import s from '../StartWindow/StartWindow.module.scss';
import { useServer } from "@/app/providers/ServerProvider/ServerProvider";

export const ServerButton = () => {
  const { isServerEnabled } = useServer();
  const { isAuth, onLogout: onResetAuth } = useAuth();
  const navigate = useNavigate();

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

  const openDocsPage = () => {
    navigate(getDocsPagePath());
  }

  return (isServerEnabled)
    ? (<li className={s.listItem}>
      {isAuth
        ? (
          <>
            <button
              className={classNames(s.secondary, {}, [])}
              onClick={openDocsPage}
            >
              Список документов
            </button>
            <button onClick={onLogout} className={classNames(s.secondary, {}, [])}>
              Выйти
            </button>
          </>
        )
        : (
          <button onClick={onAuthClick} className={classNames(s.secondary, {}, [])}>
            Авторизоваться
          </button>
        )
      }
    </li>)
    : (<li className={s.listItem}>Сервер недоступен</li>)

}