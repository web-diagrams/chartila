import { getRegisterPath, getStartPath } from "@/shared/config/routePaths";
import { Modal } from "@/shared/ui/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../model/hooks/useUserInfo";
import { useLoginMutation } from "@/app/api/authApi";
import { useAuth } from "@/app/providers/AuthProvider";

interface Props {
}

export const LoginForm = ({

}: Props) => {
  const { onAuth } = useAuth();
  const navigate = useNavigate();
  const [login, { error }] = useLoginMutation();
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
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Логин" value={userInfo.login} onChange={onChangeLogin} />
        <input type="password" placeholder="Пароль" value={userInfo.password} onChange={onChangePassword} />
        {error && 'data' in error && typeof error.data === 'string' && <p>{error.data}</p>}
        <button type='submit'>Войти</button>
        <button onClick={onRegisterClick}>Зарегистрироваться</button>
      </form>
    </Modal>
  )
};