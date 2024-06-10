import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../category.reository';
import { CreateCategory, Category } from '../../dto/category.dto';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class CategoryPrismaReository implements ICategoryRepository {
  constructor(private prisma: PrismaService) {}
  async save(data: CreateCategory): Promise<Category> {
    const category = await this.prisma.bookCategory.create({ data });
    return category;
  }

  async findByName(category: string): Promise<Category | null> {
    const findCategory = await this.prisma.bookCategory.findUnique({
      where: {
        category: category,
      },
    });

    return findCategory;
  }

  async listAllCategories(): Promise<Category[]> {
    const categoriesList = await this.prisma.bookCategory.findMany();

    return categoriesList;
  }
}
