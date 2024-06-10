import { FindUserByIdUseCase } from './useCases/find-user-by-id.usecase';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateUser, CreateUserSwaggerSchema } from './dto/user.dto';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { CreateUserValidationPipe } from './pipe/create-user.validation';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  @Post()
  @ApiBody({
    description: 'Create a new user',
    type: CreateUserSwaggerSchema,
  })
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUser) {
    const user = await this.createUserUseCase.execute(data);
    return user;
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async findUser(@Request() request) {
    const user = await this.findUserByIdUseCase.execute(request.user.sub);
    return user;
  }
}
