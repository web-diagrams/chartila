import { UserInfo } from "@/shared/types/userInfo"
import { useState } from "react"

/**
 * Hook for managing user authentication information
 * @returns Object containing user info state and change handlers
 */
export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    login: '',
    password: '',
  })

  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const login = e.currentTarget.value;
    setUserInfo(prev => ({ ...prev, login }))
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.currentTarget.value;
    setUserInfo(prev => ({ ...prev, password }))
  }

  return {
    userInfo,
    onChangeLogin,
    onChangePassword,
  }
};
