import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { IBookRepository } from './repositories/book.repository';
import { BookPrismaRepository } from './repositories/prisma/book.prisma.repository';
import { CreateBookUseCase } from './useCases/create-book.usecase';
import { ListPaginationBooksUseCase } from './useCases/list-pagination-books.usecase';
import { FindBookUseCase } from './useCases/find-book.usecase';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [
    PrismaService,
    CreateBookUseCase,
    ListPaginationBooksUseCase,
    FindBookUseCase,
    {
      provide: IBookRepository,
      useClass: BookPrismaRepository,
    },
  ],
})
export class BookModule {}
