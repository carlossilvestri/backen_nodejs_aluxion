import { Request } from "express"
import { generateId } from "../../../../shared/global/helpers"
import {CreateUserRequest, GlobalResponse, User} from "../../../../shared/global/domain/entities"
import { UserRepository } from "../../../../shared/global/domain/repositories"

const createUserInteractor = (
    userRepository: UserRepository
) => async ( req : Request) : Promise<GlobalResponse> => {

  // Get data
  const { name, email, password } = req.body

  // Check email is not in the database
  const userExist : User = await userRepository.getByEmail(email)
  if(userExist) return { errors:[{ value: email, param: "email", msg: "Email is already registered on the DB, please try another one.", location: "body"}] }

  // Create user object
  const createUser: CreateUserRequest = {
      name,
      email,
      password,
      token: generateId()
  };

  const userCreated : User = await userRepository.create(createUser)

  return userCreated;
};

export default createUserInteractor;