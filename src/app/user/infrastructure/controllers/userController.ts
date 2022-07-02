import { Request, Response, NextFunction } from "express"
import httpStatus from "http-status";
import {
    CreateUserInteractor as createUserInteractor,
    DeleteUserInteractor as deleteUserInteractor, 
    LoginUserInteractor as loginUserInteractor, 
    UpdateUserInteractor as updateUserInteractor,
    ForgetPasswordInteractor as forgetPasswordInteractor,
    GetUsersInteractor as getUsersInteractor
} from "../../application/interactors"
import { GlobalResponse } from "../../../shared/global/domain/entities"

/* USER CONTROLLER ACTIONS */

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
    const response = await forgetPasswordInteractor(req)
    res.status(httpStatus.OK).json(response)
}

export const deleteUserController = async (req: Request, res: Response) => {
    const response = await deleteUserInteractor(req)
    res.status(httpStatus.OK).json(response)
}
export const getUsersController = async (req: Request, res: Response) => {
    const response = await getUsersInteractor(req)
    res.status(httpStatus.OK).json(response)
}