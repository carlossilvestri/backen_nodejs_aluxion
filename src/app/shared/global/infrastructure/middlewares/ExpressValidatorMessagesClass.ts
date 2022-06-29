import express from "express"
import httpStatus from "http-status"
import { validationResult, ValidationChain } from "express-validator"

export class ExpressValidatorMessagesClass {

    private static validatorMiddleware: ExpressValidatorMessagesClass;
    constructor() { }
    /**
     * getValidatorMiddleware()
     * @returns ExpressValidatorMessagesClass
     */
    public static getValidatorMiddleware(): ExpressValidatorMessagesClass {
        if (!ExpressValidatorMessagesClass.validatorMiddleware) {
            ExpressValidatorMessagesClass.validatorMiddleware = new ExpressValidatorMessagesClass();
        }
        return ExpressValidatorMessagesClass.validatorMiddleware;
    }

    public validate = (validations: ValidationChain[]) => {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            await Promise.all(validations.map(validation => validation.run(req)))
            const errors = validationResult(req)
            if (errors.isEmpty()) {
                return next()
            }

            res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
                data: errors.array()
            })
        }
    }
}