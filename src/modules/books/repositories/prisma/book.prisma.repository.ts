import { Injectable } from '@nestjs/common';
import { IBookRepository } from '../book.repository';
import { PrismaService } from 'src/infra/database/prisma.service';
import { Book, CreateBook } from '../../dto/book';
import { Pagination } from 'src/interfaces/pagination';

@Injectable()
export class BookPrismaRepository implements IBookRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateBook): Promise<Book> {
    return await this.prismaService.book.create({
      data: data,
      include: {
        author: true,
        bookCategory: true,
      },
    });
  }

  async findById(bookId: string): Promise<Book> {
    return await this.prismaService.book.findUnique({
      where: {
        id: bookId,
      },
      include: {
        author: true,
        bookCategory: true,
      },
    });
  }

  async findPaginatedBooks(
    page: number,
    limit: number,
  ): Promise<Pagination<Book>> {
    const offset = (page - 1) * limit;

    const pagination = await this.prismaService.book.findMany({
      include: {
        author: true,
        bookCategory: true,
      },
      skip: offset,
      take: Number(limit),
    });

    const count = await this.prismaService.book.count();

    return {
      current: page,
      next: Number(page) + 1,
      preview: Number(page) - 1,
      total: count,
      results: pagination,
    } as Pagination<Book>;
  }
}