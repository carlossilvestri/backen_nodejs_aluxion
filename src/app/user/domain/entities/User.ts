export interface User {
    id_user:      string
    name:           string
    email:          string
    password:       string
    token:          string | null
    updatedAt: Date,
    createdAt: Date
}
export interface CreateUserRequest extends Omit<User, 'id_user' | 'updatedAt' | 'createdAt'>{}