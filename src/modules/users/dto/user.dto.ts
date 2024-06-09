import { ApiProperty } from '@nestjs/swagger';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  profile: 'wirter' | 'reader' | string;
  avatar?: string;
}

export interface CreateUser extends Omit<User, 'id'> {}

export class CreateUserSwaggerSchema implements CreateUser {
  @ApiProperty({ example: 'Joao', description: 'Name of the user' })
  name: string;

  @ApiProperty({
    example: 'joao@example.com',
    description: 'Email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Password of the user',
  })
  password: string;

  @ApiProperty({
    example: 'writer',
    description: 'Profile of the user',
  })
  profile: string;
}
