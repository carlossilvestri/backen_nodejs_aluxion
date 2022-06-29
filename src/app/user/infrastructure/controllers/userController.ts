import { Request, Response, NextFunction } from "express"
import { body, check, validationResult } from "express-validator";
import httpStatus from 'http-status';
import createUserInteractor from "../../application/interactors/create"
import { User } from "../../domain/entities/User"

/* USER CONTROLLER ACTIONS */

/* This method should be used for POST and PUT */
export const saveUser = async (req: Request, res: Response, next: NextFunction) => {
    const userCreated: any = await createUserInteractor(req)
    if(userCreated.error) res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ data: userCreated})
    res.status(httpStatus.CREATED).json({ data: userCreated})
}