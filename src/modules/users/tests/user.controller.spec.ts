import { Test } from '@nestjs/testing';
import { IUserRepository } from '../repositories/user.repository';
import { UserController } from '../user.controller';
import { JwtModule } from '@nestjs/jwt';
import { CreateUserUseCase } from '../useCases/create-user.usecase';
import { FindUserByIdUseCase } from '../useCases/find-user-by-id.usecase';
import { CreateUser } from '../dto/user.dto';
import { randomUUID } from 'crypto';

describe('user controller', () => {
  let userController: UserController;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UserController],
      providers: [
        CreateUserUseCase,
        FindUserByIdUseCase,
        {
          provide: IUserRepository,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userRepository = moduleRef.get<IUserRepository>(IUserRepository);
  });

  it('shold be able create a new user', async () => {
    const body: CreateUser = {
      email: 'joao@gmail.com',
      name: 'joão',
      password: 'senhaTeste',
      profile: 'writer',
    };

    jest.spyOn(userRepository, 'create').mockResolvedValue({
      ...body,
      id: randomUUID(),
    });

    const result = await userController.create(body);

    expect(result).toHaveProperty('email');
  });
});
