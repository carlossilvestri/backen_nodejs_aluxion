import { Router } from "express"
import { AuthJWTClass } from "../../../shared/global/classes/AuthJWTClass"
import { createUserController, updateUserController, loginUserController, forgetPasswordUserController } from "../controllers/userController"
import { createUserMiddleware, updateUserMiddleware } from "../middlewares/userMiddlewares"

const router = Router()
const authInstance = AuthJWTClass.getAuthJWTClassInstance()
const authCheckJWT = authInstance.authMiddleware

// Routing
router.route('/user')
        .post([createUserMiddleware], createUserController)
        .put([updateUserMiddleware, authCheckJWT], updateUserController)

router.route('/user_login')
        .post(loginUserController)
       
router.route('/user_forget_password')
        .get(forgetPasswordUserController)

export default router