import { randomUUID } from 'crypto';
import { CreateUser, User } from '../../dto/user.dto';
import { IUserRepository } from '../user.repository';

export class UserInMemoryRepository implements IUserRepository {
  users: User[] = [];

  async create(data: CreateUser): Promise<User> {
    const user: User = {
      ...data,
      id: randomUUID(),
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const findUser = this.users.find((user) => user.email === email);
    return findUser;
  }

  findById(id: string): Promise<User | null> {
    throw new Error('Method not is implemented!');
  }
}
