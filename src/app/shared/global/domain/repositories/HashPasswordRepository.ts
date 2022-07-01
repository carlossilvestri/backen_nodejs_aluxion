export interface HashPasswordRepository {
  getHashedPassword(password: string): Promise<string>
}