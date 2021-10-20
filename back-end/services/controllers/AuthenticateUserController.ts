import { Request, Response } from "express"
import { AuthenticateUserService } from "../authenticateUserService"

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const service = new AuthenticateUserService()
    // service.execute()
  }
}

export { AuthenticateUserController }