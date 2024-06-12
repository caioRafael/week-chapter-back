import { Injectable } from '@nestjs/common';
import { IBookRepository } from '../repositories/book.repository';

@Injectable()
export class FindBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(id: string) {
    const book = await this.bookRepository.findById(id);

    return book;
  }
}
