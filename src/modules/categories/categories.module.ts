import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateCategoryUseCase } from './useCases/create-category.usecase';
import { ICategoryRepository } from './reositories/category.reository';
import { CategoryPrismaReository } from './reositories/prisma/category.prisma.repopsitory';
import { ListCategoriesUseCase } from './useCases/list-categories.usecase';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [
    PrismaService,
    CreateCategoryUseCase,
    ListCategoriesUseCase,
    {
      provide: ICategoryRepository,
      useClass: CategoryPrismaReository,
    },
  ],
})
export class CategoriesModule {}
