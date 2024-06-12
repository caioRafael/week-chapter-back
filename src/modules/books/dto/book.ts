import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/modules/categories/dto/category.dto';
import { User } from 'src/modules/users/dto/user.dto';

export interface Book {
  id: string;
  title: string;
  sinopse: string;
  cover?: string;
  publishedChapters: number;
  author: User;
  authorId: string;
  bookCategory: Category;
  bookCategoryId: string;
}

export interface CreateBook
  extends Omit<Book, 'id' | 'author' | 'bookCategory' | 'publishedChapters'> {}

export class CreateBookSwaggerSchema implements Omit<CreateBook, 'authorId'> {
  @ApiProperty({
    example: 'Misterios da meia noite',
    description: 'Title of the book',
  })
  title: string;

  @ApiProperty({
    example:
      'Apresentando os misterios da meia noite, que voam longe, que voçê nunca, não sabe nunca, quem vai quem fica, quem vai quem foi',
    description: 'Sinopse of the book',
  })
  sinopse: string;

  @ApiProperty({
    example: 'category id',
    description: 'category id of the book',
  })
  bookCategoryId: string;
}
