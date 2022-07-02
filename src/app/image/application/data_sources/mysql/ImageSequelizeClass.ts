import { ImageRepository } from "../../../../shared/global/domain/repositories"
import { Image as ImageModelSequelize } from "../../../domain/models/Image"
import {
    CreateImageRequest,
    Image,
} from "../../../domain/entities/Image"
// import { Model } from "sequelize/types"

export class ImageSequelize implements ImageRepository {
    private static userSequelize: ImageSequelize

    public async create(imageCreate: CreateImageRequest): Promise<Image> {
        const image: any = await ImageModelSequelize.create(imageCreate)
        return image
    }
    public async save(id: string, image: Image): Promise<Image> {
        let imageFound: any = await this.getById(id)

        image.name ? (imageFound.name = image.name) : null
        image.link ? (imageFound.email = image.link) : null
        image.updatedAt ? (imageFound.updatedAt = image.updatedAt) : null

        const result = await imageFound.save()
        return result
    }
    public async getById(id: string): Promise<Image> {
        const image: any = await ImageModelSequelize.findByPk(id)
        return image
    }
    public async deleteById(id: string): Promise<any> {
        const result = await ImageModelSequelize.destroy({
            where: {
                id_image: id,
            },
        })
        return result
    }
    /**
     * This function return the instance of the class. If the instance doesn't exist, it creates it. (Singleton Pattern).
     * @returns {ImageSequelize}
     */
    public static getImageSequelizeInstance(): ImageSequelize {
        if (!ImageSequelize.userSequelize) {
            ImageSequelize.userSequelize = new ImageSequelize()
        }
        return ImageSequelize.userSequelize
    }
}
export default ImageSequelize
