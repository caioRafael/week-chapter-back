import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../reositories/category.reository';

@Injectable()
export class ListCategoriesUseCase {
  constructor(private categoryReository: ICategoryRepository) {}

  async execute() {
    const categoriesList = await this.categoryReository.listAllCategories();

    return categoriesList;
  }
}
