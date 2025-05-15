import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './category.service';
import { getModelToken } from '@nestjs/mongoose';
import { Category } from '../schemas/category.schema';
import { HttpException, NotFoundException } from '@nestjs/common';

const mockCategoryModel = {
  create: jest.fn(),
  find: jest.fn().mockReturnThis(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  exec: jest.fn(),
};

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: getModelToken(Category.name), useValue: mockCategoryModel },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      mockCategoryModel.create.mockResolvedValue({ name: 'Test' });
      const result = await service.create({ name: 'Test' });
      expect(result.name).toBe('Test');
    });

    it('should throw if category creation fails', async () => {
      mockCategoryModel.create.mockResolvedValue(null);
      await expect(service.create({ name: 'Test' })).rejects.toThrow(HttpException);
    });
  });

  describe('findAll', () => {
    it('should return all categories', async () => {
      mockCategoryModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([{ name: 'Cat' }]) });
      const result = await service.findAll();
      expect(result[0].name).toBe('Cat');
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      mockCategoryModel.findById.mockResolvedValue({ name: 'Test' });
      const result = await service.findOne('id');
      expect(result.name).toBe('Test');
    });

    it('should throw if category not found', async () => {
      mockCategoryModel.findById.mockResolvedValue(null);
      await expect(service.findOne('id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      mockCategoryModel.findByIdAndUpdate.mockResolvedValue({ name: 'Updated' });
      const result = await service.update('id', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if category not found', async () => {
      mockCategoryModel.findByIdAndUpdate.mockResolvedValue(null);
      await expect(service.update('id', { name: 'Updated' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a category', async () => {
      mockCategoryModel.findByIdAndDelete.mockResolvedValue({ _id: 'id' });
      const result = await service.remove('id');
      expect(result).toBe('Category with id: id deleted successfully');
    });

    it('should throw if category not found', async () => {
      mockCategoryModel.findByIdAndDelete.mockResolvedValue(null);
      await expect(service.remove('id')).rejects.toThrow(HttpException);
    });
  });

  describe('searchByName', () => {
    it('should search categories by name', async () => {
      mockCategoryModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([{ name: 'Test' }]) });
      const result = await service.searchByName('Test');
      expect(result[0].name).toBe('Test');
    });
  });
});
