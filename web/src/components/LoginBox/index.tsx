import { useEffect } from "react"
import { VscGithubInverted } from "react-icons/vsc"
import { api } from "../../services/api"

import styles from "./loginBoxWrapper.module.scss"

type AuthResponse = {
  token: string,
  user: {
    id: string,
    avatar_url: string,
    name: string,
    login: string
  }
}

export function LoginBox() {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=deb27542a07d446cca7b`

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>("authenticate", {
      code: githubCode
    })

    const { token , user } = response.data

    localStorage.setItem("@nlw7:token", token)
    console.log(user)
  }

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
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size="24" />
        Entrar com Github
      </a>
    </div>
  )
}