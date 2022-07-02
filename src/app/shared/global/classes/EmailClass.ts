import dotenv from "dotenv"
import nodemailer, { Transporter } from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"
import { User } from "../domain/entities"
import { NotifyRepository } from "../domain/repositories"
dotenv.config()

export class EmailClass implements NotifyRepository {
    /* VARIABLES NEEDED */
    private emailHost: string = (process.env.EMAIL_HOST as string) ?? ""
    private emailUser: string = (process.env.EMAIL_USER as string) ?? ""
    private emailPassword: string = (process.env.EMAIL_PASSWORD as string) ?? ""
    private emailPort: number = Number(process.env.EMAIL_PORT)
    private transport :  Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
        host: this.emailHost,
        port: this.emailPort,
        auth: {
            user: this.emailUser,
            pass: this.emailPassword,
        },
    })

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

    /**
     * This function sends and email to forget password.
     * @param data 
     */
    public sendForgetEmail = async (data: User, newPassword : string) => {
        const { email, name, token } = data
        const urlToSend = `${process.env.PAGE_LINK}/user_update_password`
        const response = await this.transport.sendMail({
            from: "example.com",
            to: email,
            subject: "Reestablecer Password",
            html: `
            <h1 style="text-align:center; font-family: Arial, Helvetica;">Reestablecer Password</h1>

            <p style="font-family: Arial, Helvetica;">Hola, ${name} has solicitado reestablecer tu password, tu nuevo password es ${newPassword}</p>
            `
        })
        console.log("data ", data)
        console.log("response ", response)
        return response
    }
}

export const generateId = () =>
    Date.now().toString(32) + Math.random().toString(32).substring(2)
