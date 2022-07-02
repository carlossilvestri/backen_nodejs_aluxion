import { ExpressValidatorMessagesClass } from "../../../shared/global/classes/ExpressValidatorMessagesClass"
import { check, param, query, } from "express-validator"

/* SINGLETON ON  MIDDLEWARE */
export const validatorMiddleware: ExpressValidatorMessagesClass = ExpressValidatorMessagesClass.getValidatorMiddleware()

export const createImageMiddleware = validatorMiddleware.validate([
    check('image').notEmpty().withMessage('You must select an image.'),
])