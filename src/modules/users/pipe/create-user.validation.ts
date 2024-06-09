import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUser } from '../dto/user.dto';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  transform(value: CreateUser) {
    const { email, name, password, profile } = value;

    if (!email || !name || !password || !profile) {
      throw new HttpException(
        '[name, email, password, perfil] são obrigatorios',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return value;
  }
}
