import { Module } from '@nestjs/common';
import { IUserRepository } from '../users/repositories/user.repository';
import UserPrismaRepository from '../users/repositories/prisma/user.prisma.repository';
import { LoginUseCase } from './useCases/login.usecase';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [LoginController],
  providers: [
    PrismaService,
    LoginUseCase,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class LoginModule {}
