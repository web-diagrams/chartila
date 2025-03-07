import { getLoginPath } from "@/shared/config/routePaths";
import { Modal } from "@/shared/ui/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../model/hooks/useUserInfo";
import { useRegistrationMutation } from "@/app/api/authApi";

interface Props {

}

export const RegisterForm = ({

}: Props) => {
  const navigate = useNavigate();
  const [register, { error }] = useRegistrationMutation();
  const { userInfo, onChangeLogin, onChangePassword } = useUserInfo();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await register(userInfo);
    if (!('error' in result)) {
      console.log('success')
    }
  }

  const onLoginClick = () => {
    const path = getLoginPath()
    navigate(path);
  }
  return (
    <Modal title="Зарегистрироваться">
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Логин" value={userInfo.login} onChange={onChangeLogin} />
        <input type="password" placeholder="Пароль" value={userInfo.password} onChange={onChangePassword} />
        {error && 'data' in error && typeof error.data === 'string' && <p>{error.data}</p>}
        <button type='submit'>Зарегистрироваться</button>
        <button onClick={onLoginClick}>Войти</button>
      </form>
    </Modal>
  )
};