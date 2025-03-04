import { useLoginMutation } from "@/app/api/authApi";
import ModalWrapper from "@/components/ModalWrapper/ModalWrapper";
import { useEffect } from "react";

export const AuthPage = () => {
  const [login, { data, isLoading, isError }] = useLoginMutation();
  useEffect(() => {
    const getCookie = (name) => {
      const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
      return match ? match[2] : null;
    };

    const userToken = getCookie("user-token");

    if (!userToken) {
      login({
        login: 'oleg',
        password: 'q123'
      })
    }
  }, [])

  return <div>
    Авторизация
  </div>;
};
