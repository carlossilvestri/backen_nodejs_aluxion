import { Router } from "express"
import { AuthJWTClass } from "../../../shared/global/classes/AuthJWTClass"
import { createImageController } from "../controllers/imageController"

const router = Router()
const authInstance = AuthJWTClass.getAuthJWTClassInstance()
const authCheckJWT = authInstance.authMiddleware

// Routing
router.route('/')
        .post([authCheckJWT], createImageController)

export default router