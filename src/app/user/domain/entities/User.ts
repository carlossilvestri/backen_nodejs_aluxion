export interface User {
    id_user:        string
    name:           string
    email:          string
    password:       string
    token:          string | null | undefined
    updatedAt:      Date, 
    createdAt:      Date
    checkPassword?: (password: string) => boolean
}
export interface CreateUserRequest      extends Omit<User, 'id_user' | 'updatedAt' | 'createdAt'>{}
export interface CreateUserRequestSent  extends Omit<User, 'id_user' | 'updatedAt' | 'createdAt' | 'token'>{}
export interface UpdateUserRequest      extends Omit<User, 'id_user' | 'createdAt' | 'token'>{}
export type UpdateUserRequestSent       = Omit<User, 'id_user' | 'updatedAt' | 'createdAt' | 'token'> & {
    name?:           string
    email?:          string
    password?:       string
}