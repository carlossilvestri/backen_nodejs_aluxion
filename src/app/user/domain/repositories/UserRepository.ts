import { User } from '../../../shared/global/domain/entities';
import { CreateUserRequest, UpdateUserRequest } from '../entities/User';

export interface UserRepository {
  save(id: string, user: UpdateUserRequest): Promise<User>
  create(userCreate: CreateUserRequest): Promise<User>
  getById(id: string): Promise<User>
  getByEmail(email: string): Promise<User>
}