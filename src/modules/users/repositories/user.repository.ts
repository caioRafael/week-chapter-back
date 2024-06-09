import { CreateUser, User } from '../dto/user.dto';

export abstract class IUserRepository {
  abstract create(data: CreateUser): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
}
