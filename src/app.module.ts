import { Module } from '@nestjs/common';
import { PrismaService } from './infra/database/prisma.service';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
