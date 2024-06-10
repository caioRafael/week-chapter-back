import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginData, LoginDataSwaggerSchema } from './dto/login.dto';
import { LoginUseCase } from './useCases/login.usecase';

@ApiTags('Login')
@Controller('/login')
export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  @Post()
  @ApiBody({
    type: LoginDataSwaggerSchema,
  })
  async login(@Body() data: LoginData) {
    return this.loginUseCase.execute(data);
  }
}
