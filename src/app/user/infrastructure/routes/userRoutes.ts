import { Router } from "express"
import pagination from "../../../shared/global/middlewares/pagination"
import { AuthJWTClass } from "../../../shared/global/classes/AuthJWTClass"
import { createUserController,getUsersController, updateUserController, loginUserController, forgetPasswordUserController, deleteUserController } from "../controllers/userController"
import { createUserMiddleware, forgetPasswordMiddleware, updateUserMiddleware } from "../middlewares/userMiddlewares"

const router = Router()
const authInstance = AuthJWTClass.getAuthJWTClassInstance()
const authCheckJWT = authInstance.authMiddleware

// Routing
router.route('/user')
        .post([createUserMiddleware], createUserController)
        .put([updateUserMiddleware, authCheckJWT], updateUserController)
        .delete([authCheckJWT], deleteUserController)
        .get([pagination, authCheckJWT], getUsersController)

router.route('/user_login')
        .post(loginUserController)
       
router.route('/user_forget_password')
        .post([forgetPasswordMiddleware], forgetPasswordUserController)

export default router