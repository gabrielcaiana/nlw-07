import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string,
  name: string,
  login: string,
  avatar_url: string
}

type AuthResponse = {
  token: string,
  user: {
    id: string,
    avatar_url: string,
    name: string,
    login: string
  }
}

type authContextData = {
  user: User | null
  signInUrl: string,
  signOut: () => void
}

export const AuthContext = createContext({} as authContextData)

type AuthProvider = {
  children: ReactNode
}

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null)

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=deb27542a07d446cca7b`

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>("authenticate", {
      code: githubCode
    })

    const { token , user } = response.data

    localStorage.setItem("@nlw7:token", token)

    api.defaults.headers.common.authorization = `Bearer ${token}`
    
    setUser(user)
  }

  function signOut() {
    setUser(null)
    localStorage.removeItem("@nlw7:token")
  }

  useEffect(() => {
    const token = localStorage.getItem('@nlw7:token')

    if(token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`

      api.get<User>("profile").then(response => {
        setUser(response.data)
      })
    }
  },[])

  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes("?code=")

    if(hasGithubCode) {
      const [urlWihoutCode, githubCode] = url.split("?code=")
      window.history.pushState({}, '', urlWihoutCode)

      signIn(githubCode)
    }
  },[])

  return(
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}