import { Request } from "express"
import { GlobalResponse } from "../../../../shared/global/domain/entities"
import { UserRepository } from "../../../../shared/global/domain/repositories"
import { AuthJWTClass } from "../../../../shared/global/classes/AuthJWTClass"

const loginUserInteractor =
    (userRepository: UserRepository) =>
    async (req: Request): Promise<GlobalResponse> => {
        const auth = AuthJWTClass.getAuthJWTClassInstance()

        // Get data
        const { email, password} = req.body

        // Check if email exists

        // Get user by email
        let response: GlobalResponse | any = await userRepository.getByEmail(email)

        // Email is not registered
        if (!response) {
            response = {
                errors: [
                    {
                        value: password,
                        msg: "Email is not registered",
                        param: "email",
                        location: "body",
                    },
                ],
            }
            return response
        }
        // Check if password is not true

        if (!response.checkPassword(password)) {
            response = [
                {
                    value: String(password),
                    msg: "Password does not match",
                    param: "password",
                    location: "body"
                },
            ]
            return response
        }
        // Password and email are correct.

        // Generate token
        const token = auth.generateJWT(response)
        response = {
            token
        }
        return response
    }

export default loginUserInteractor
