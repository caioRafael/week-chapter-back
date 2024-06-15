import { IUserRepository } from '../../repositories/user.repository';
import { Test } from '@nestjs/testing';
import { CreateUserUseCase } from './../create-user.usecase';
import { UserInMemoryRepository } from '../../repositories/in-memory/user.in-memory.repository';
import { CreateUser, User } from '../../dto/user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
describe('create user use-case', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: IUserRepository,
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('shoud not able create a new user, by dont have e-mail', async () => {
    const body: Partial<User> = {
      name: 'caio',
      password: '1234',
      profile: 'writer',
    };

    expect(createUserUseCase.execute(body as CreateUser)).rejects.toThrow();
  });

  it('should not able create a new user, by user already exist', async () => {
    const body: CreateUser = {
      name: 'caio',
      password: '1234',
      profile: 'writer',
      email: 'caio@gmail.com',
    };

    await createUserUseCase.execute(body);

    expect(await createUserUseCase.execute(body)).rejects.toThrow(
      new HttpException('Usuário já cadastrado', HttpStatus.BAD_REQUEST)
    );
  });
});
