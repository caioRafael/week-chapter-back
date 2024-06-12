import { Injectable } from '@nestjs/common';
import { IBookRepository } from '../repositories/book.repository';

@Injectable()
export class ListPaginationBooksUseCase {
  constructor(private bookeRepository: IBookRepository) {}

  async execute(page: number, limit: number) {
    const paginationBooks = await this.bookeRepository.findPaginatedBooks(
      page,
      limit,
    );

    return paginationBooks;
  }
}
