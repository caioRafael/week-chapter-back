import { Module } from '@nestjs/common';
import { PrismaService } from './infra/database/prisma.service';
import { UserModule } from './modules/users/user.module';
import { LoginModule } from './modules/login/login.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [UserModule, LoginModule, CategoriesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
