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
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateBookUseCase } from './useCases/create-book.usecase';
import { CreateBook, CreateBookSwaggerSchema } from './dto/book';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { ListPaginationBooksUseCase } from './useCases/list-pagination-books.usecase';
import { FindBookUseCase } from './useCases/find-book.usecase';

enum PaginationLimit {
  Twenty = 20,
  Fifty = 50,
  Hundred = 100,
}

@ApiTags('Books')
@Controller('/books')
export class BookController {
  constructor(
    private createBookUseCase: CreateBookUseCase,
    private listPaginationBooksUseCase: ListPaginationBooksUseCase,
    private findbookUseCase: FindBookUseCase,
  ) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.findbookUseCase.execute(id);
  }

  @Get('/list/:page')
  @ApiQuery({
    name: 'limit',
    enum: PaginationLimit,
  })
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
