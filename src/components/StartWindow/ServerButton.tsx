import { usePingQuery } from "@/app/api/pingApi";
import { useAuth } from "@/app/providers/AuthProvider";
import { getDocsPagePath, getLoginPath } from "@/shared/config/routePaths";
import { classNames } from "@/utils";
import { useNavigate } from "react-router-dom";
import s from './StartWindow.module.scss';

export const ServerButton = () => {
  const { isFetching, isError } = usePingQuery(undefined);
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

  return (!isFetching && !isError)
    ? (<li className={s.listItem}>
      {isAuth
        ? (
          <>
            <button
              className={classNames(s.button, {}, [s.button_type_label])}
              onClick={openDocsPage}
            >
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
    </li>)
    : (<li className={s.listItem}>Сервер недоступен</li>)

}