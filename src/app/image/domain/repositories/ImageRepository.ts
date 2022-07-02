import { CreateImageRequest, Image } from "../entities/Image";

export interface ImageRepository {
    create(imageCreate: CreateImageRequest): Promise<Image>
    save(id: string, image: Image): Promise<Image>
    getById(id: string): Promise<Image>
    getById(id: string): Promise<Image>
}