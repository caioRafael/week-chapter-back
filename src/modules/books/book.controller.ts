import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateBookUseCase } from './useCases/create-book.usecase';
import { CreateBook, CreateBookSwaggerSchema } from './dto/book';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { ListPaginationBooksUseCase } from './useCases/list-pagination-books.usecase';

@ApiTags('Books')
@Controller('/books')
export class BookController {
  constructor(
    private createBookUseCase: CreateBookUseCase,
    private listPaginationBooksUseCase: ListPaginationBooksUseCase,
  ) {}

  @Get()
  async findOne() {
    return 'ola livro';
  }

  @Get('/list/:page')
  async paginationList(
    @Param('page') page: number,
    @Query() param: { limit: number },
  ) {
    return await this.listPaginationBooksUseCase.execute(page, param.limit);
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({
    type: CreateBookSwaggerSchema,
  })
  @UseGuards(AuthGuard)
  async create(@Body() data: CreateBook, @Request() request) {
    return await this.createBookUseCase.execute(
      data,
      request.user.sub,
      request.user.profile,
    );
  }
}
