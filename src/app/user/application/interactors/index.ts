import { HashPasswordClass } from '../../../shared/global/classes';
import { UserRepository, HashPasswordRepository  } from '../../../shared/global/domain/repositories';
import UserSequelize from '../data_sources/mysql/UserSequelizeClass';
import createUserInteractor from './create/createUserInteractor';
import loginUserInteractor from './login/loginUserInteractor';
import updateUserInteractor from './update/updateUserInteractor';


const userRepository            : UserRepository        = UserSequelize.getUserSequelizeInstance();
const hashPasswordRepository    : HashPasswordRepository= HashPasswordClass.getHashPasswordClassInstance()



export const CreateUserInteractor = createUserInteractor(userRepository)
export const LoginUserInteractor = loginUserInteractor(userRepository)
export const UpdateUserInteractor = updateUserInteractor(userRepository, hashPasswordRepository)