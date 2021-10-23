import { Router } from "express"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { CreateMessageController } from "./controllers/CreateMessageController"
import { Get3LastMessageController } from "./controllers/Get3LastMessageController"
import { ensureAuthenticated } from "./middleware/ensureAuthenticated"
import { Get3LastMessageService } from "./services/Get3LastMessageService"

const router = Router()

router.post("/authenticate", new AuthenticateUserController().handle)

router.post("/messages", ensureAuthenticated, new CreateMessageController().handle)

router.get("/messages/last3", new Get3LastMessageController().handle)

export { router }