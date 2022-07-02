import { Request } from "express"
import { ExpressValidatorResponse, GlobalResponse, User } from "../../../../shared/global/domain/entities"
import { UserRepository } from "../../../../shared/global/domain/repositories"

const deleteUserInteractor =
    (userRepository: UserRepository) =>
    async (req: Request): Promise<GlobalResponse> => {
        // Get data
        //@ts-ignore
        const { id_user, email } = req.user

        // Check email is not in the database
        const userExist: User = await userRepository.getByEmail(email)
        if (!userExist) {
            const errors: ExpressValidatorResponse = {
                errors: [
                    {
                        value: email,
                        param: "email",
                        msg: "Email does not exist on the DB, please try another one.",
                        location: "body",
                    },
                ],
            }
            return errors
        }
        // Delete user
        const userDeleted: any = await userRepository.deleteById(id_user)

        return userDeleted
    }

export default deleteUserInteractor
