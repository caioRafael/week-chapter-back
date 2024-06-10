import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ICategoryRepository } from '../reositories/category.reository';
import { CreateCategory } from '../dto/category.dto';

@Injectable()
export class CreateCategoryUseCase {
  private readonly logger = new Logger(CreateCategoryUseCase.name);
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(data: CreateCategory, profile: 'writer' | 'reader') {
    if (profile === 'reader') {
      throw new UnauthorizedException(
        'Você não tem permissão para criar uma categoria',
      );
    }

    const findCategory = await this.categoryRepository.findByName(
      data.category,
    );

    if (findCategory) {
      this.logger.error(`A Categoria, ${data.category}, já foi criada`);
      throw new HttpException(
        'Categoria já cadastrada',
        HttpStatus.BAD_REQUEST,
      );
    }

    const category = await this.categoryRepository.save(data);

    return category;
  }
}
