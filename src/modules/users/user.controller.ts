import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { CreateUser, CreateUserSwaggerSchema } from './dto/user.dto';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { CreateUserValidationPipe } from './pipe/create-user.validation';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Get()
  list() {
    return 'olá mundo';
  }

  @Post()
  @ApiBody({
    type: CreateUserSwaggerSchema,
  })
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUser) {
    const user = await this.createUserUseCase.execute(data);
    return user;
  }
}
