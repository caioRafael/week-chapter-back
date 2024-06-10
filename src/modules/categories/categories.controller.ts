import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import {
  CreateCategory,
  CreateCategorySwaggerSchema,
} from './dto/category.dto';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { CreateCategoryUseCase } from './useCases/create-category.usecase';
import { ListCategoriesUseCase } from './useCases/list-categories.usecase';

@Controller('categories')
export class CategoriesController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private listCategoriesUseCase: ListCategoriesUseCase,
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiBody({
    type: CreateCategorySwaggerSchema,
  })
  @UseGuards(AuthGuard)
  async create(@Body() data: CreateCategory, @Request() request) {
    const category = await this.createCategoryUseCase.execute(
      data,
      request.user.profile,
    );

    return category;
  }

  @Get()
  async listAllCategories() {
    const categoriesList = await this.listCategoriesUseCase.execute();

    return categoriesList;
  }
}
