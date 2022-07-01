import e, { Request } from "express"
import { matchedData } from "express-validator"
import { GlobalResponse, ExpressValidatorResponse, User} from "../../../../shared/global/domain/entities"
import { UserRepository, HashPasswordRepository } from "../../../../shared/global/domain/repositories"


const updateUserInteractor = (
    userRepository: UserRepository,
    hashPassword: HashPasswordRepository
) => async ( req : Request) : Promise<GlobalResponse> => {

  // Get only User properties data using matchedData and setting option() in middleware.
  const data = matchedData(req, { includeOptionals: false })
  //@ts-ignore
  const { id_user, email } = req.user

  // Create user object
  const updateUser: any = {
      ...data,
      updatedAt: new Date()
  };
  // Did the user want to change the password?
  if(updateUser.password && updateUser.password != ''){
    // Hash the password
    updateUser.password = await hashPassword.getHashedPassword(updateUser.password)
  }

  // Did the user send the email?
  if(updateUser.email){
    // Get the user by email to check if the email is already registered
    const emailAlreadyExists = await userRepository.getByEmail(updateUser.email)
    // Check if email is already registered
    if(emailAlreadyExists && updateUser.email != email){
      // Return an object of ExpressValidatorResponse
      const errors : ExpressValidatorResponse = {
        errors: [
          {
            value:      String(updateUser.email),
            msg:        "Email already exists",
            param:      "email",
            location:   "body",
          }
        ]
      }
      return errors
    }
  }
  // Update the user
  const updatedUser : User = await userRepository.save(id_user, updateUser)


  return updatedUser;
};

export default updateUserInteractor;