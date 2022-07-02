import { User } from "../entities";

export interface NotifyRepository {
    sendForgetEmail: (data: User, newPassword: string) => Promise<any>
  }