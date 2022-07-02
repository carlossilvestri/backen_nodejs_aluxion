import { Request, Response, NextFunction } from "express"
import httpStatus from "http-status"
import { UploadImageInteractor as uploadImageInteractor } from "../../application/interactors"

/* USER CONTROLLER ACTIONS */

export const createImageController = async (req: Request, res: Response) => {
    const response = await uploadImageInteractor(req)
    //@ts-ignore
    if (response?.errors) {
        res.status(httpStatus.UNPROCESSABLE_ENTITY).json(response)
    } else {
        res.status(httpStatus.CREATED).json(response)
    }
}
