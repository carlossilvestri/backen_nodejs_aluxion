import { Request, Response, NextFunction } from 'express';
import { User } from '../entities';

export interface AuthRepository {
  generateJWT(data: User)                                               :   string
  generateId()                                                          :   string
  authMiddleware( req: Request, res: Response, next: NextFunction)      :    void
}