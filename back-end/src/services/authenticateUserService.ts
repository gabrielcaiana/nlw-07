import axios from "axios"

interface IAccessTokenResponse {
  access_token: string
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = `http://github.com/login/oauth/access_token`

    const { data: IAccessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id : process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {
        "accept": "application/json"
      }
    })

    return IAccessTokenResponse.access_token
  }
}

export { AuthenticateUserService }