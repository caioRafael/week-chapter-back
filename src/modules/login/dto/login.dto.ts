import { ApiProperty } from '@nestjs/swagger';

export interface LoginData {
  email: string;
  password: string;
}

export class LoginDataSwaggerSchema implements LoginData {
  @ApiProperty({
    example: 'joao@example.com',
    description: 'Email of the user',
  })
  email: string;

  @ApiProperty({ example: 'password', description: 'Password of the user' })
  password: string;
}
