export interface UserImage {
    user_image_id:                          string
    userAluxionIdUser:                      string
    imageAluxionIdImage:                    string
    updatedAt:                              Date
    createdAt:                              Date
}
export interface CreateUserImageRequest extends Omit<UserImage, 'user_image_id' | 'updatedAt' | 'createdAt'>{}