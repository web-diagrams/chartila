import { getLoginPath } from "@/shared/config/routePaths";
import { Modal } from "@/shared/ui/Modal/Modal";
import { useNavigate } from "react-router-dom";

interface Props {

}

export const RegisterForm = ({

}: Props) => {
  const navigate = useNavigate();

  const onLoginClick = () => {
    const path = getLoginPath()
    navigate(path);
  }
  return (
    <Modal title="Зарегистрироваться">
      <form>
        <input type="text" placeholder="Логин" />
        <input type="password" placeholder="Пароль" />
        <button>Зарегистрироваться</button>
        <button onClick={onLoginClick}>Войти</button>
      </form>
    </Modal>
  )
};