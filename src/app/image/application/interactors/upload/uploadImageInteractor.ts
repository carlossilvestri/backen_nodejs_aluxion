import { Request } from "express"
import {
    CreateImageRequest,
    CreateUserImageRequest,
    ExpressValidatorResponse,
} from "../../../../shared/global/domain/entities"
import {
    ImageAWSRepository,
    ImageRepository,
    UserImageRepository,
} from "../../../../shared/global/domain/repositories"

const uploadImageInteractor =
    (
        imageAWSRepository: ImageAWSRepository,
        imageRepository: ImageRepository,
        imageUserRepository:  UserImageRepository
    ) =>
    async (req: Request): Promise<any> => {
        //@ts-ignore
        const { id_user } = req.user
        const files: any = req.files
        const file: any = files?.image
        const errors: ExpressValidatorResponse = {
            errors: [
                {
                    value: "image",
                    msg: "There was an error with the image.",
                    param: "image",
                    location: "files",
                },
            ],
        }
        if (!file) return errors

        const imageUpload = await Promise.all([
            imageAWSRepository.uploadFile(file),
            imageAWSRepository.unlinkFile(file.tempFilePath),
        ])
        // There was an error?
        if (!imageUpload[0]) return errors
        // No errors... Save image on our DB
        const image: CreateImageRequest = {
            name: imageUpload[0].Key,
            link: imageUpload[0].Location,
        }

        // Save image on our DB
        const imageSaved = await imageRepository.create(image)

        // Create CreateUserImageRequest object
        const userImage         : CreateUserImageRequest = {
          userAluxionIdUser     : id_user,
          imageAluxionIdImage	: imageSaved.id_image
        }
        // Link image to user who uploaded the image
        const imageUser = await imageUserRepository.create(userImage)
        const imageUploaded = imageUpload[0]
        return { awsResponse: imageUploaded, imageSaved, imageUser }
    }

export default uploadImageInteractor
