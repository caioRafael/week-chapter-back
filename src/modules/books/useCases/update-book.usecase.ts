import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IBookRepository } from '../repositories/book.repository';
import { Book } from '../dto/book';

@Injectable()
export class UpdateBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(data: Book, userId: string) {
    if (userId !== data.authorId)
      throw new UnauthorizedException(
        'Você não tem permição para alterar esse livro!',
      );

    return await this.bookRepository.update(data);
  }
}
