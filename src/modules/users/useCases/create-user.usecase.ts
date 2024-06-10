import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';
import { CreateUser, User } from '../dto/user.dto';
import { hash } from 'bcrypt';
@Injectable()
export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name);
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUser): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email);

    if (user) {
      this.logger.error(`O email ${data.email}, já está cadastrado...`, data);
      throw new HttpException('Usuário já cadastrado', HttpStatus.BAD_REQUEST);
    }

    const password = await hash(data.password, 10);

    return await this.userRepository.create({
      ...data,
      password,
    });
  }
}
