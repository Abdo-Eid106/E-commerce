import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import User from './entities/user.entity';
import { Repository } from 'typeorm';

class UserRepositoryMock implements Partial<Repository<User>> {
  create = jest.fn();
  save = jest.fn();
}

describe('test UserService', () => {
  let service: UserService;
  const FakeUserRepository = UserRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test create user function', () => {
    service.createUser({
      name: 'abdo',
      email: 'abdoeid2121@gmail.com',
      password: '1234',
    });
  });
});

//user.service.spec.ts
