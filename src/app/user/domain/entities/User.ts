export interface User {
    id_user:        string | undefined
    name:           string | undefined
    email:          string | undefined
    password:       string | undefined
    token:          string | null | undefined
    updatedAt:      Date | undefined, 
    createdAt:      Date | undefined
    checkPassword?: (password: string) => boolean
}
export interface CreateUserRequest extends Omit<User, 'id_user' | 'updatedAt' | 'createdAt'>{}
export interface UpdateUserRequest extends Omit<User, 'id_user' | 'createdAt' | 'token'>{}