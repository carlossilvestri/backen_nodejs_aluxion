import UserSequelize from '../../../domain/data_sources/mysql/UserSequelizeClass';
import createUserInteractor from './createUserInteractor';


const userRepository = UserSequelize.getUserSequelizeInstance();



export  default createUserInteractor(userRepository)