import dotenv from 'dotenv'
import nodemailer from "nodemailer"
dotenv.config()


/**
 * consts to use on Sequelize
 */
 const emailHost            : string = process.env.EMAIL_HOST as string ?? ''
 const emailUser            : string = process.env.EMAIL_USER as string ?? ''
 const emailPassword        : string = process.env.EMAIL_PASSWORD as string ?? ''
 const emailPort            : number = Number(process.env.EMAIL_PORT)

export const emailRegister = async (data : any) => {
    const transport = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        auth: {
          user: emailUser,
          pass: emailPassword
        }
      });
      console.log("data ", data)
}
export const generateId = () => Date.now().toString(32) + Math.random().toString(32).substring(2)