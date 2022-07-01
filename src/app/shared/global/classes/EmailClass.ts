import dotenv from "dotenv"
import nodemailer from "nodemailer"
dotenv.config()

export class EmailClass {
    private emailHost: string = (process.env.EMAIL_HOST as string) ?? ""
    private emailUser: string = (process.env.EMAIL_USER as string) ?? ""
    private emailPassword: string = (process.env.EMAIL_PASSWORD as string) ?? ""
    private emailPort: number = Number(process.env.EMAIL_PORT)

    private static emailClassInstance: EmailClass

    constructor() {}

    /**
     * getEmailClassInstance()
     * @returns EmailClass
     */
    public static getEmailClassInstance(): EmailClass {
        if (!EmailClass.emailClassInstance) {
            EmailClass.emailClassInstance = new EmailClass()
        }
        return EmailClass.emailClassInstance
    }

    public emailRegister = async (data: any) => {
        const transport = nodemailer.createTransport({
            host: this.emailHost,
            port: this.emailPort,
            auth: {
                user: this.emailUser,
                pass: this.emailPassword,
            },
        })
        console.log("data ", data)
    }
}

export const generateId = () =>
    Date.now().toString(32) + Math.random().toString(32).substring(2)
