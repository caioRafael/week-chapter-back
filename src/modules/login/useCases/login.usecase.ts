import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginData } from '../dto/login.dto';
import { IUserRepository } from 'src/modules/users/repositories/user.repository';
import { compare } from 'bcrypt';

@Injectable()
export class LoginUseCase {
  constructor(
    private jwtService: JwtService,
    private userRepository: IUserRepository,
  ) {}

  async execute(data: LoginData) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const isEqualPassword = await compare(data.password, user.password);

    if (!isEqualPassword)
      throw new UnauthorizedException('Usuário não encontrado');

    const payload = {
      sub: user.id,
      email: user.email,
      profile: user.profile,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      acess_token: token,
    };
  }
}
