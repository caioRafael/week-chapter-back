import { ApiProperty } from '@nestjs/swagger';
export interface Category {
  id: string;
  category: string;
  descrition: string;
}

export interface CreateCategory extends Omit<Category, 'id'> {}

export class CreateCategorySwaggerSchema implements CreateCategory {
  @ApiProperty({
    example: 'Ação',
    description: 'Name of the category',
  })
  category: string;

  @ApiProperty({
    example: 'um tema envolvendo muita luta e afims',
    description: 'Descrition of the category',
  })
  descrition: string;
}
