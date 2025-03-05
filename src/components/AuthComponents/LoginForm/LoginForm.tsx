import { getRegisterPath } from "@/shared/config/routePaths";
import { Modal } from "@/shared/ui/Modal/Modal";
import { useNavigate } from "react-router-dom";

interface Props {
}

export const LoginForm = ({

}: Props) => {
  const navigate = useNavigate();

  const onRegisterClick = () => {
    const path = getRegisterPath()
    navigate(path);
  }

  return (
    <Modal title="Войти">
      <form>
        <input type="text" placeholder="Логин" />
        <input type="password" placeholder="Пароль" />
        <button>Войти</button>
        <button onClick={onRegisterClick}>Зарегистрироваться</button>
      </form>
    </Modal>
  )
};