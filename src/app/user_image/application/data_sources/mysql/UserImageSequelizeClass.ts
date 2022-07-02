import { UserImageRepository } from "../../../../shared/global/domain/repositories"
import { UserImage as UserImageModelSequelize } from "../../../domain/models/UserImage"
import {
    CreateUserImageRequest,
    UserImage,
} from "../../../../shared/global/domain/entities"
import { User, Image } from "../../../../shared/global/domain/models"
// import { Model } from "sequelize/types"

export class UserImageSequelizeClass implements UserImageRepository {
    private static userImageSequelizeClass: UserImageSequelizeClass

    public async create(imageCreate: CreateUserImageRequest): Promise<UserImage> {
        const imageUser: any = await UserImageModelSequelize.create(imageCreate)
        return imageUser
    }
    public async save(id: string, imageUser: UserImage): Promise<UserImage> {
        let imageFound: any = await this.getById(id)

        imageUser.userAluxionIdUser ? (imageFound.userAluxionIdUser = imageUser.userAluxionIdUser) : null
        imageUser.imageAluxionIdImage	 ? (imageFound.email = imageUser.imageAluxionIdImage	) : null
        imageUser.updatedAt ? (imageFound.updatedAt = imageUser.updatedAt) : null

        const result = await imageFound.save()
        return result
    }
    public async getById(id: string): Promise<UserImage> {
        const imageUser: any = await UserImageModelSequelize.findByPk(id, {
            include: [
                {
                  model: User,
                  as: "user",
                  required: true,
                },
                {
                  model: Image,
                  as: 'image'
                }
              ]
        })
        return imageUser
    }
    public async deleteById(id: string): Promise<any> {
        const result = await UserImageModelSequelize.destroy({
            where: {
                id_user_image_aluxion: id,
            },
        })
        return result
    }
    /**
     * This function return the instance of the class. If the instance doesn't exist, it creates it. (Singleton Pattern).
     * @returns {UserImageSequelizeClass}
     */
    public static getUserImageSequelizeInstance(): UserImageSequelizeClass {
        if (!UserImageSequelizeClass.userImageSequelizeClass) {
            UserImageSequelizeClass.userImageSequelizeClass = new UserImageSequelizeClass()
        }
        return UserImageSequelizeClass.userImageSequelizeClass
    }
}
export default UserImageSequelizeClass
