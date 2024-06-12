import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IBookRepository } from '../repositories/book.repository';
import { CreateBook } from '../dto/book';

@Injectable()
export class CreateBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(
    data: CreateBook,
    authorId: string,
    profile: 'writer' | 'reader',
  ) {
    if (profile === 'reader')
      throw new UnauthorizedException(
        'Você não tem permissão para realizar esta ação!',
      );

    return await this.bookRepository.create({
      ...data,
      authorId: authorId,
    });
  }
}
