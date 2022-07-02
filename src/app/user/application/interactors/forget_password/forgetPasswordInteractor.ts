import { Request } from "express"
import dotenv from "dotenv"
import { ExpressValidatorResponse} from "../../../../shared/global/domain/entities"
import { NotifyRepository, UserRepository, HashPasswordRepository } from "../../../../shared/global/domain/repositories"
import { generateId } from "../../../../shared/global/helpers"
dotenv.config()

const forgetPasswordInteractor = (
    userRepository: UserRepository,
    notifyRepository: NotifyRepository,
    hashPassword: HashPasswordRepository
) => async ( req : Request) : Promise<any> => {
  // Get only User properties data using matchedData and setting option() in middleware.
  const { email } = req.body
    // Get the user by email to check if the email is already registered
    let user = await userRepository.getByEmail(email)
    // Check if user exists
    if(!user){
      // Return an object of ExpressValidatorResponse
      const errors : ExpressValidatorResponse = {
        errors: [
          {
            value:      String(email),
            msg:        "Email is not registered on our DB",
            param:      "email",
            location:   "body",
          }
        ]
      }
      return errors
    }

    // Update user
    user.updatedAt = new Date()
    const newPassword = generateId()
    // Hash the password
    user.password = await hashPassword.getHashedPassword(newPassword)

    // Update the user adn send email with new password
    const response = await Promise.all([userRepository.save(user.id_user, user), notifyRepository.sendForgetEmail(user, newPassword) ])



  return {msg: "Your new password has been sent to your email, please use it.", email: response[1]}
};

export default forgetPasswordInteractor;