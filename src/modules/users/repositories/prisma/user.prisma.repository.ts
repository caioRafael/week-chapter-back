import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateUser, User } from '../../dto/user.dto';

@Injectable()
export default class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUser): Promise<User> {
    return await this.prisma.user.create({
      data: data,
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}
