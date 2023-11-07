'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { UserType } from '../types/User'

type UserContextType = {
  userInfo: UserType | null
  setUserInfo: Dispatch<SetStateAction<UserType | null>>
}

const AuthContext = createContext<UserContextType | undefined>({
  userInfo: {} as UserType,
  setUserInfo: (): void => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserType | null>(null)

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)
export default useAuth
