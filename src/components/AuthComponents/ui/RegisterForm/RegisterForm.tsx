import { getLoginPath, getStartPath } from "@/shared/config/routePaths";
import { Modal } from "@/shared/ui/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../model/hooks/useUserInfo";
import { useRegistrationMutation } from "@/app/api/authApi";

import style from '../Auth.module.scss';
import { useAuth } from "@/app/providers/AuthProvider";
import s from '@/components/StartWindow/ui/StartWindow/StartWindow.module.scss'
import { Input } from "@/shared/ui/Input/Input";

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
        <Input type="text" placeholder="Логин" value={userInfo.login} onChange={onChangeLogin} />
        <Input type="password" placeholder="Пароль" value={userInfo.password} onChange={onChangePassword} />
        {error && 'data' in error && typeof error.data === 'string' && <p>{error.data}</p>}
        <button className={s.primary} type='submit'>{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}</button>
        <button className={s.secondary} onClick={onLoginClick}>Войти</button>
      </form>
    </Modal>
  )
};