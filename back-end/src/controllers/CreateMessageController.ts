import { Request, Response } from "express"
import { AuthenticateUserService } from "../services/AauthenticateUserService"

class CreateMessageController {
  async handle(req: Request, res: Response) {
    const { message } = req.body
   
  }
}

export { CreateMessageController }