import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  isAuth: boolean | null;
  onAuth?: () => void;
  onLogout?: () => void;
}>({ isAuth: null });

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
      return match ? match[2] : null;
    };
    const userToken = getCookie("user-token");
    setIsAuth(!!userToken)
  }, [])

  const onAuth = () => setIsAuth(true);
  const onLogout = () => setIsAuth(false);

  return (
    <AuthContext.Provider value={{ isAuth, onAuth, onLogout }}>
      {isAuth === null
        ? 'Запрос данных авторизации'
        : children
      }
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);