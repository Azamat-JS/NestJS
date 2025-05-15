import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/loginDto';
import { VerifyUserDto } from './dto/verifyDto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    register: jest.fn(dto => ({ message: 'User registered', dto })),
    login: jest.fn(dto => ({ message: 'User logged in', dto })),
    verifyUser: jest.fn(dto => ({ message: 'User verified', dto })),
    forgetPassword: jest.fn(email => ({ message: `Email sent to ${email}` })),
    accessToPassword: jest.fn(token => ({ token })),
    resetPassword: jest.fn(({ token, password }) => ({ token, password })),
    findAll: jest.fn((page, limit) => ({ page, limit, users: [] })),
    searchByName: jest.fn(name => ({ found: true, name })),
    findOne: jest.fn(id => ({ id })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn(id => ({ deleted: true, id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const dto: CreateUserDto = { name: 'test', email: 'a@a.com', password: '1234' };
    expect(await controller.register(dto)).toEqual({
      message: 'User registered',
      dto,
    });
    expect(service.register).toHaveBeenCalledWith(dto);
  });

  it('should login a user', async () => {
    const dto: LoginDto = { email: 'a@a.com', password: '1234' };
    expect(await controller.login(dto)).toEqual({
      message: 'User logged in',
      dto,
    });
  });

  it('should verify a user', async () => {
    const dto: VerifyUserDto = { verificationCode: 123456, email: 'a@a.com' };
    expect(await controller.verifyUser(dto)).toEqual({
      message: 'User verified',
      dto,
    });
  });

  it('should handle forget password', async () => {
    const email = 'a@a.com';
    expect(await controller.forgetPassword(email)).toEqual({
      message: `Email sent to ${email}`,
    });
  });

  it('should render reset-password page', async () => {
    const token = 'abc123';
    expect(await controller.accessToPassword(token)).toEqual({ token });
  });

  it('should find all users with pagination', async () => {
    expect(await controller.findAll('1', '5')).toEqual({
      page: 1,
      limit: 5,
      users: [],
    });
  });

  it('should search user by name', async () => {
    expect(await controller.searchUser('john')).toEqual({ found: true, name: 'john' });
  });

  it('should get a user by id', async () => {
    expect(await controller.findOne('123')).toEqual({ id: '123' });
  });

  it('should update a user', async () => {
    const dto: UpdateUserDto = { name: 'newname' };
    expect(await controller.update('123', dto)).toEqual({ id: '123', username: 'newname' });
  });

  it('should delete a user', async () => {
    expect(await controller.remove('123')).toEqual({ deleted: true, id: '123' });
  });
});
