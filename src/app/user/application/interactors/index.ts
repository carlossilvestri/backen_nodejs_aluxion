import { HashPasswordClass, EmailClass } from '../../../shared/global/classes';
import { UserRepository, HashPasswordRepository, NotifyRepository, UserImageRepository  } from '../../../shared/global/domain/repositories';
import UserSequelize from '../data_sources/mysql/UserSequelizeClass';
import createUserInteractor from './create/createUserInteractor';
import loginUserInteractor from './login/loginUserInteractor';
import updateUserInteractor from './update/updateUserInteractor';
import forgetPasswordInteractor from './forget_password/forgetPasswordInteractor';
import deleteUserInteractor from './delete/deleteUserInteractor'
import getUsersInteractor from './get_users/getUsersInteractor';
import UserImageSequelizeClass from '../../../user_image/application/data_sources/mysql/UserImageSequelizeClass';

const userRepository            : UserRepository        = UserSequelize.getUserSequelizeInstance();
const hashPasswordRepository    : HashPasswordRepository= HashPasswordClass.getHashPasswordClassInstance()
const notifyRepository          : NotifyRepository      = EmailClass.getEmailClassInstance()
// const userImageRepository       : UserImageRepository   = UserImageSequelizeClass.getUserImageSequelizeInstance()



export const CreateUserInteractor = createUserInteractor(userRepository)
export const LoginUserInteractor = loginUserInteractor(userRepository)
export const UpdateUserInteractor = updateUserInteractor(userRepository, hashPasswordRepository)
export const ForgetPasswordInteractor = forgetPasswordInteractor(userRepository, notifyRepository, hashPasswordRepository)
export const DeleteUserInteractor = deleteUserInteractor(userRepository)
export const GetUsersInteractor = getUsersInteractor(userRepository)