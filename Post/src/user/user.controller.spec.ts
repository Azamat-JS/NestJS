import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ObjectId } from 'mongodb';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUser = {
    _id: new ObjectId(),
    username: 'Ali',
    email: 'ali@gmail.com',
    password: 'ali123',
    createdAt: new Date(),
  };

  const mockUserService = {
    getAllUsers: jest.fn().mockResolvedValue([mockUser]),
    createUser: jest.fn().mockResolvedValue(mockUser),
    updateUser: jest.fn().mockResolvedValue({ ...mockUser, username: 'Updated Ali' }),
    deleteUser: jest.fn().mockResolvedValue('User deleted successfully'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return array of users', async () => {
      const result = await controller.getAllUsers();
      expect(result).toEqual([mockUser]);
      expect(service.getAllUsers).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should return the created user', async () => {
      const userDto = {
        username: 'Ali',
        email: 'ali@gmail.com',
        password: 'ali123',
      };
      const result = await controller.createUser(userDto);
      expect(result).toEqual(mockUser);
      expect(service.createUser).toHaveBeenCalledWith(userDto);
    });
  });

  describe('updateUser', () => {
    it('should return the updated user', async () => {
      const updatedDto = {
        username: 'Updated Ali',
        email: 'ali@gmail.com',
        password: 'ali123',
      };
      const result = await controller.updateUser(mockUser._id.toString(), updatedDto);
      expect(result.username).toBe('Updated Ali');
      expect(service.updateUser).toHaveBeenCalledWith(mockUser._id.toString(), updatedDto);
    });
  });

  describe('deleteUser', () => {
    it('should return delete confirmation', async () => {
      const result = await controller.deleteUser(mockUser._id.toString());
      expect(result).toBe('User deleted successfully');
      expect(service.deleteUser).toHaveBeenCalledWith(mockUser._id.toString());
    });
  });
});
