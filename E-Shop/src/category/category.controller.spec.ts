import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './category.controller';
import { CategoriesService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtGuard } from '../Guards/jwt.guard';
import { AdminGuard } from '../Guards/admin.guard';

const mockCategoriesService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  searchByName: jest.fn(),
};

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        { provide: CategoriesService, useValue: mockCategoriesService },
      ],
    })
      .overrideGuard(JwtGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AdminGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const dto: CreateCategoryDto = { name: 'Test' };
      mockCategoriesService.create.mockResolvedValue(dto);
      const result = await controller.create(dto);
      expect(result).toEqual(dto);
      expect(mockCategoriesService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all categories', async () => {
      mockCategoriesService.findAll.mockResolvedValue([{ name: 'Cat' }]);
      const result = await controller.findAll();
      expect(result).toEqual([{ name: 'Cat' }]);
    });
  });

  describe('searchCategory', () => {
    it('should search categories by name', async () => {
      mockCategoriesService.searchByName.mockResolvedValue([{ name: 'Test' }]);
      const result = await controller.searchCategory('Test');
      expect(result).toEqual([{ name: 'Test' }]);
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      mockCategoriesService.findOne.mockResolvedValue({ name: 'Test' });
      const result = await controller.findOne('id');
      expect(result).toEqual({ name: 'Test' });
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const dto: CreateCategoryDto = { name: 'Updated' };
      mockCategoriesService.update.mockResolvedValue(dto);
      const result = await controller.update('id', dto);
      expect(result).toEqual(dto);
    });
  });

  describe('remove', () => {
    it('should delete a category', async () => {
      mockCategoriesService.remove.mockResolvedValue('Category with id: id deleted successfully');
      const result = await controller.remove('id');
      expect(result).toBe('Category with id: id deleted successfully');
    });
  });
});
