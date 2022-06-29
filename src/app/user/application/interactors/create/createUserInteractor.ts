import { Request } from "express"
import { emailRegister } from "../../../../shared/global/infrastructure/helpers/email"
import { generateId } from "../../../../shared/global/infrastructure/helpers/token"
import {CreateUserRequest, User} from "../../../../shared/global/domain/entities"
import { UserRepository } from "../../../../shared/global/domain/repositories"

const createUserInteractor = (
    userRepository: UserRepository
) => async ( req : Request) => {

  // Get data
  const { name, email, password } = req.body

  // Check email is not in the database
  const userExist : User = await userRepository.getByEmail(email)
  if(userExist) return { error: true, msg: "Email is already registered on the DB, please try another one."}

  // Create user object
  const createUser: CreateUserRequest = {
      name,
      email,
      password,
      token: generateId()
  };

  const userCreated : User = await userRepository.create(createUser)

  emailRegister(createUser)

  return userCreated;
};

export default createUserInteractor;