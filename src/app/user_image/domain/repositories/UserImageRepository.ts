import { UserImage, CreateUserImageRequest } from "../../../shared/global/domain/entities";

export interface UserImageRepository {
    create(imageCreate: CreateUserImageRequest): Promise<UserImage>
    save(id: string, image: UserImage): Promise<UserImage>
    getById(id: string): Promise<UserImage>
    getById(id: string): Promise<UserImage>
}