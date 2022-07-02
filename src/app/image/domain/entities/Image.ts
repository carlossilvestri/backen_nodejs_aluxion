export interface Image {
    id_image:       string
    name:           string
    link:           string
    updatedAt:      Date
    createdAt:      Date
}
export interface CreateImageRequest      extends Omit<Image, 'id_image' | 'updatedAt' | 'createdAt'>{}