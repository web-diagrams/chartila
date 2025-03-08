import { getLoginPath, getStartPath } from "@/shared/config/routePaths";
import { Modal } from "@/shared/ui/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../model/hooks/useUserInfo";
import { useRegistrationMutation } from "@/app/api/authApi";

import style from '../Auth.module.scss';
import { useAuth } from "@/app/providers/AuthProvider";

interface Props {

}

export const RegisterForm = ({

}: Props) => {
  const { onAuth } = useAuth();
  const navigate = useNavigate();
  const [register, { error, isLoading }] = useRegistrationMutation();
  const { userInfo, onChangeLogin, onChangePassword } = useUserInfo();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await register(userInfo);
    if (!('error' in result)) {
      onAuth && onAuth();
      navigate(getStartPath());
    }
  }

  const onLoginClick = () => {
    const path = getLoginPath()
    navigate(path);
  }
  return (
    <Modal title="Зарегистрироваться">
      <form onSubmit={onSubmit} className={style.form}>
        <input type="text" placeholder="Логин" value={userInfo.login} onChange={onChangeLogin} />
        <input type="password" placeholder="Пароль" value={userInfo.password} onChange={onChangePassword} />
        {error && 'data' in error && typeof error.data === 'string' && <p>{error.data}</p>}
        <button type='submit'>{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}</button>
        <button onClick={onLoginClick}>Войти</button>
      </form>
    </Modal>
  )
};