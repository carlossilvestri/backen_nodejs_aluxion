import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import httpStatus from "http-status"
import dotenv from "dotenv"
import { User } from "../domain/entities"
import { AuthRepository } from "../domain/repositories"
dotenv.config()

export class AuthJWTClass implements AuthRepository {
    private jwtSecret: string = (process.env.JWT_SECRET as string) ?? ""
    private jwtDuration: string = (process.env.JWT_DURATION as string) ?? ""
    private static authJWT: AuthJWTClass

    constructor() {}

    /**
     * getAuthJWTClassMiddleware()
     * @returns AuthJWTClass
     */
    public static getAuthJWTClassInstance(): AuthJWTClass {
        if (!AuthJWTClass.authJWT) {
            AuthJWTClass.authJWT = new AuthJWTClass()
        }
        return AuthJWTClass.authJWT
    }

    public generateJWT = (data: User) => {
        return jwt.sign(
            { id_user: data.id_user, email: data.email, name: data.name },
            this.jwtSecret,
            { expiresIn: this.jwtDuration }
        )
    }

    public generateId = () => Date.now().toString(32) + Math.random().toString(32).substring(2)

    public authMiddleware = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const token = (req.headers.token as string) ?? ""

        /*
         * Check if authorization header is set
         */
        if (
            req.hasOwnProperty("headers") &&
            req.headers.hasOwnProperty("authorization")
        ) {
            try {
                /*
                 * Try to decode & verify the JWT token
                 * The token contains user's id ( it can contain more informations )
                 * and this is saved in req.user object
                 */
                //@ts-ignore
                req.user = jwt.verify(
                    //@ts-ignore
                    req.headers["authorization"],
                    this.jwtSecret
                )
            } catch (err) {
                /*
                 * If the authorization header is corrupted, it throws exception
                 * So return 401 status code with JSON error message
                 */
                return res.status(httpStatus.UNAUTHORIZED).json({
                    error: {
                        msg: "Failed to authenticate token!",
                    },
                })
            }
        } else {
            /*
             * If there is no autorization header, return 401 status code with JSON
             * error message
             */
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: {
                    msg: "No token! Send in headers authorization and your token",
                },
            })
        }
        next()
        return
    }
    
}
