
import { AWSImageClass } from '../data_sources/aws_s3/AWSImageClass';
import { UserImageRepository, ImageRepository, ImageAWSRepository } from '../../../shared/global/domain/repositories';
import uploadImageInteractor from './upload/uploadImageInteractor'
import ImageSequelizeClass from '../data_sources/mysql/ImageSequelizeClass';
import UserImageSequelizeClass from '../../../user_image/application/data_sources/mysql/UserImageSequelizeClass';

const imageAWSRepository            : ImageAWSRepository        = AWSImageClass.getAWSImageClassInstance();
const imageRepository               : ImageRepository           = ImageSequelizeClass.getImageSequelizeInstance();
const imageUserRepository           : UserImageRepository       = UserImageSequelizeClass.getUserImageSequelizeInstance();



export const UploadImageInteractor = uploadImageInteractor(imageAWSRepository, imageRepository, imageUserRepository)