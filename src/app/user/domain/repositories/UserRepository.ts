import { User } from '../../../shared/global/domain/entities';
import { CreateUserRequest } from '../entities/User';

export interface UserRepository {
  save(user: User): Promise<void>
  create(userCreate: CreateUserRequest): Promise<any>
  getById(id: string): Promise<User>
  getByEmail(email: string): Promise<User>
}