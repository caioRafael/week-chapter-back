import { Book, CreateBook } from '../dto/book';
import { Pagination } from 'src/interfaces/pagination';

export abstract class IBookRepository {
  abstract create(data: CreateBook): Promise<Book>;
  abstract findById(bookId: string): Promise<Book | null>;
  abstract findPaginatedBooks(
    page: number,
    limit: number,
  ): Promise<Pagination<Book>>;
  abstract update(data: Book): Promise<Book>;
}
