import { Category, CreateCategory } from '../dto/category.dto';

export abstract class ICategoryRepository {
  abstract save(data: CreateCategory): Promise<Category>;
  abstract findByName(category: string): Promise<Category | null>;
  abstract listAllCategories(): Promise<Category[]>;
}
