import dotenv from "dotenv"
import bcrypt from "bcrypt"
import { HashPasswordRepository } from "../domain/repositories"
dotenv.config()

export class HashPasswordClass implements HashPasswordRepository {
    private passwordSalt: number = Number(process.env.PASSWORD_SALT) ?? 10

    private static hashPasswordInstance: HashPasswordClass

    constructor() {}

    /**
     * getAuthJWTClassMiddleware()
     * @returns HashPasswordClass
     */
    public static getHashPasswordClassInstance(): HashPasswordClass {
        if (!HashPasswordClass.hashPasswordInstance) {
            HashPasswordClass.hashPasswordInstance = new HashPasswordClass()
        }
        return HashPasswordClass.hashPasswordInstance
    }

    public getHashedPassword = async (password: string) : Promise<string> => {
        const salt = await bcrypt.genSalt(this.passwordSalt)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    }
    
}
