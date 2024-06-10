import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserController } from './user.controller';
import { IUserRepository } from './repositories/user.repository';
import UserPrismaRepository from './repositories/prisma/user.prisma.repository';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { FindUserByIdUseCase } from './useCases/find-user-by-id.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    FindUserByIdUseCase,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
