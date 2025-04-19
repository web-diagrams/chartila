import { getRegisterPath, getStartPath } from "@/shared/config/routePaths";
import { Modal } from "@/shared/ui/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../model/hooks/useUserInfo";
import { useLoginMutation } from "@/app/api/authApi";
import { useAuth } from "@/app/providers/AuthProvider";

import style from '../Auth.module.scss';
import s from '@/components/StartWindow/ui/StartWindow/StartWindow.module.scss'
import { Input } from "@/shared/ui/Input/Input";

interface Props {
}

export const LoginForm = ({

}: Props) => {
  const { onAuth } = useAuth();
  const navigate = useNavigate();
  const [login, { error, isLoading }] = useLoginMutation();
  const { userInfo, onChangeLogin, onChangePassword } = useUserInfo();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await login(userInfo);
    if (!('error' in result)) {
      onAuth && onAuth();
      navigate(getStartPath());
    }
  }

  const onRegisterClick = () => {
    navigate(getRegisterPath());
  }

  return (
    <Modal title="Войти">
      <form onSubmit={onSubmit} className={style.form}>
        <Input type="text" placeholder="Логин" value={userInfo.login} onChange={onChangeLogin} />
        <Input type="password" placeholder="Пароль" value={userInfo.password} onChange={onChangePassword} />
        {error && 'data' in error && typeof error.data === 'string' && <p>{error.data}</p>}
        <button className={s.primary} type='submit'>{isLoading ? 'Авторизация...' : 'Войти'}</button>
        <button className={s.secondary} onClick={onRegisterClick}>Зарегистрироваться</button>
      </form>
    </Modal>
  )
};