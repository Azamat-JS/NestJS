import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import { HttpException } from '@nestjs/common';

jest.mock('nodemailer');

const mockUserModel = {
  findOne: jest.fn(),
  findById: jest.fn(),
  find: jest.fn().mockReturnThis(),
  countDocuments: jest.fn(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should throw if user already exists', async () => {
      mockUserModel.findOne.mockResolvedValue({});
      await expect(
        service.register({ email: 'test@example.com' } as any),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('login', () => {
    it('should throw if user not found', async () => {
      mockUserModel.findOne.mockResolvedValue(null);
      await expect(
        service.login({ email: 'nope@test.com', password: 'pass' }),
      ).rejects.toThrow(HttpException);
    });

    it('should throw if password is incorrect', async () => {
      mockUserModel.findOne.mockResolvedValue({
        password: 'hashed',
        isVerified: true,
      });
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as any);

      await expect(
        service.login({ email: 'a@test.com', password: 'wrong' }),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('verifyUser', () => {
    it('should verify a user', async () => {
      const save = jest.fn();
      const now = new Date();
      const future = new Date(now.getTime() + 100000);
      const user = {
        isVerified: false,
        verificationCodeExpires: future,
        verificationCode: 123456,
        save,
      };
      mockUserModel.findOne.mockResolvedValue(user);

      const result = await service.verifyUser({
        email: 'a@test.com',
        verificationCode: 123456,
      });
      expect(result).toBe('User verified successfully');
      expect(save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return paginated users', async () => {
      mockUserModel.find.mockReturnThis();
      mockUserModel.skip.mockReturnThis();
      mockUserModel.limit.mockReturnThis();
      mockUserModel.exec.mockResolvedValue([{ name: 'user' }]);
      mockUserModel.countDocuments.mockResolvedValue(1);

      const result = await service.findAll(1, 10);
      expect(result.items).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('should return user by id', async () => {
      const user = { id: '123', name: 'Test' };
      mockUserModel.findById.mockResolvedValue(user);
      const result = await service.findOne('123');
      expect(result).toEqual(user);
    });
  });

  describe('remove', () => {
    it('should delete user by id', async () => {
      mockUserModel.findByIdAndDelete.mockResolvedValue({ id: '123' });
      const result = await service.remove('123');
      expect(result).toBe('User with id: 123 deleted successfully');
    });
  });

  describe('searchByName', () => {
    it('should search users by name', async () => {
      mockUserModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([{ name: 'test' }]) });
      const result = await service.searchByName('test');
      expect(result[0].name).toBe('test');
    });
  });
});
