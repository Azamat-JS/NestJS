import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostService } from './posts.service';
import { ObjectId } from 'mongodb';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostService;

  const mockPost = {
    _id: new ObjectId(),
    title: 'Test Title',
    content: 'Test Content',
    userId: new ObjectId().toString(),
    createdAt: new Date(),
  };

  const mockPostService = {
    createPost: jest.fn().mockResolvedValue(mockPost),
    findAllPosts: jest.fn().mockResolvedValue([mockPost]),
    findOnePost: jest.fn().mockResolvedValue(mockPost),
    updatePost: jest.fn().mockResolvedValue({ ...mockPost, title: 'Updated' }),
    removePost: jest.fn().mockResolvedValue('post deleted successfully'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a post', async () => {
    const dto = {
      title: 'Test Title',
      content: 'Test Content',
      userId: mockPost.userId,
    };

    const result = await controller.createPost(dto);
    expect(result).toEqual(mockPost);
    expect(service.createPost).toHaveBeenCalledWith(dto);
  });

  it('should return all posts', async () => {
    const result = await controller.findAllPosts();
    expect(result).toEqual([mockPost]);
    expect(service.findAllPosts).toHaveBeenCalled();
  });

  it('should return one post', async () => {
    const result = await controller.findOne(mockPost._id.toString());
    expect(result).toEqual(mockPost);
    expect(service.findOnePost).toHaveBeenCalledWith(mockPost._id.toString());
  });

  it('should update a post', async () => {
    const updateDto = {
      title: 'Updated',
      content: 'Updated Content',
    };

    const result = await controller.update(mockPost._id.toString(), updateDto);
    expect(result.title).toBe('Updated');
    expect(service.updatePost).toHaveBeenCalledWith(mockPost._id.toString(), updateDto);
  });

  it('should delete a post', async () => {
    const result = await controller.remove(mockPost._id.toString());
    expect(result).toBe('post deleted successfully');
    expect(service.removePost).toHaveBeenCalledWith(mockPost._id.toString());
  });
});
