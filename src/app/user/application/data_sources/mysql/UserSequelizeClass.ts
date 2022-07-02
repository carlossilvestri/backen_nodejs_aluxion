import { UserRepository } from "../../../../shared/global/domain/repositories"
import { User as UserModelSequelize, Image as ImageModel } from "../../../../shared/global/domain/models"
import {
    CreateUserRequest,
    UpdateUserRequest,
    User,
} from "../../../domain/entities/User"

export class UserSequelize implements UserRepository {
    private static userSequelize: UserSequelize

    public async create(userCreate: CreateUserRequest): Promise<User> {
        const user: any = await UserModelSequelize.create(userCreate)
        return user
    }
    public async save(id: string, user: UpdateUserRequest): Promise<User> {
        let userFound: any = await this.getById(id)

        user.name ? (userFound.name = user.name) : null
        user.email ? (userFound.email = user.email) : null
        user.password ? (userFound.password = user.password) : null
        user.updatedAt ? (userFound.updatedAt = user.updatedAt) : null

        const result = await userFound.save()
        return result
    }
    public async getById(id: string): Promise<User> {
        const user: any = await UserModelSequelize.findByPk(id)
        return user
    }
    public async getByEmail(email: string): Promise<User> {
        const user: any = await UserModelSequelize.findOne({ where: { email } })
        return user
    }
    public async getUsers(offset: number, limit : number): Promise<User[]> {
        const users: any = await UserModelSequelize.findAll({
            limit,
            offset,
            order: [
              ['createdAt', 'DESC']
            ],
            include: ImageModel
        })
        return users
    }
    public async deleteById(id: string): Promise<any> {
        const result = await UserModelSequelize.destroy({
            where: {
                id_user: id,
            },
        })
        return result
    }
    /**
     * This function return the instance of the class. If the instance doesn't exist, it creates it. (Singleton Pattern).
     * @returns {UserSequelize}
     */
    public static getUserSequelizeInstance(): UserSequelize {
        if (!UserSequelize.userSequelize) {
            UserSequelize.userSequelize = new UserSequelize()
        }
        return UserSequelize.userSequelize
    }
}
export default UserSequelize
