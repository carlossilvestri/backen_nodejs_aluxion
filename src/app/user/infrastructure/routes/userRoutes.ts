import { Router, Request, Response, NextFunction } from "express"
import { saveUser } from "../controllers/userController"
import { createUserMiddleware } from "../middlewares/userMiddlewares"

const router = Router()

// Routing
router.route('/user')
        .post([createUserMiddleware], saveUser)
/*
router.route('/user_login')
        .get(registerForm)
        .post([createUserMiddleware], saveUser)
        
router.route('/user_forget_password')
        .get(forgetPasswordForm)

*/
export default router