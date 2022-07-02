import { Request } from "express"
import { UserRepository, UserImageRepository } from "../../../../shared/global/domain/repositories"

const getUsersInteractor =
    (
        userRepository: UserRepository
        
    ) =>
    async (req: Request): Promise<any> => {
        const { pagination } = req.body
        const users = await userRepository.getUsers(pagination.offset, pagination.limit)
        // const userImages = await userImageRepository.getById("71bd64b5-676e-491c-b3de-a463c9f08aab")
        return users
    }

export default getUsersInteractor
