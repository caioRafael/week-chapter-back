import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserController } from './user.controller';
import { IUserRepository } from './repositories/user.repository';
import UserPrismaRepository from './repositories/prisma/user.prisma.repository';
import { CreateUserUseCase } from './useCases/create-user.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
