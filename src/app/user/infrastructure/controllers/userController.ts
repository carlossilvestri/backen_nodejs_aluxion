import { Request, Response, NextFunction } from "express"
import httpStatus from "http-status";
import {CreateUserInteractor as createUserInteractor, LoginUserInteractor as loginUserInteractor, UpdateUserInteractor as updateUserInteractor} from "../../application/interactors"
import { GlobalResponse } from "../../../shared/global/domain/entities"

/* USER CONTROLLER ACTIONS */

/* This method should be used for POST and PUT */
export const createUserController = async (req: Request, res: Response) => {
    const response: GlobalResponse = await createUserInteractor(req)
    //@ts-ignore
    if(response?.errors){
        res.status(httpStatus.UNPROCESSABLE_ENTITY).json(response)
    }else{
        res.status(httpStatus.CREATED).json(response)
    }
}

export const updateUserController = async (req: Request, res: Response) => {

    const respose = await updateUserInteractor(req)
    res.status(httpStatus.OK).json(respose)
}

export const loginUserController = async (req: Request, res: Response) => {
    const response: GlobalResponse = await loginUserInteractor(req)
    res.status(httpStatus.OK).json(response)
}

export const forgetPasswordUserController = async (req: Request, res: Response) => {
    res.status(httpStatus.OK).json({data: "funciona"})
}