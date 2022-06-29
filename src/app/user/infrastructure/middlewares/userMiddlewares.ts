import { ExpressValidatorMessagesClass } from "../../../shared/global/infrastructure/middlewares/ExpressValidatorMessagesClass"
import { check, param, query, } from "express-validator"

/* SINGLETON ON  MIDDLEWARE */
export const validatorMiddleware: ExpressValidatorMessagesClass = ExpressValidatorMessagesClass.getValidatorMiddleware()

export const createUserMiddleware = validatorMiddleware.validate([
    check('name').notEmpty().withMessage('name cannot be empty'),
    check('email').isEmail().withMessage('email is not valid'),
    check('password').isLength({min: 6 }).withMessage('password should have at least 6 characters'),
])