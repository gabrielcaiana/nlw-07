import { Request, Response } from 'express';
import { Get3LastMessageService } from '../services/Get3LastMessageService';

class Get3LastMessageController {
  async handle(req: Request, res: Response) {
    const service = new Get3LastMessageService()

    const result = await service.execute()

    return res.json(result)
  }
}

export { Get3LastMessageController };
