import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { ObjectId } from 'mongodb';
import { NotFoundException } from '@nestjs/common';

describe('PostService', () => {
  let service: PostService;
  let repository: any;

  const mockPost = {
    _id: new ObjectId(),
    title: 'Test Title',
    content: 'Test Content',
    userId: new ObjectId(),
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    repository = module.get(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a post', async () => {
    const dto = {
      title: 'Test Title',
      content: 'Test Content',
      userId: new ObjectId().toString(),
    };

    repository.create.mockReturnValue(dto);
    repository.save.mockResolvedValue(mockPost);

    const result = await service.createPost(dto);
    expect(result).toEqual(mockPost);
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should return all posts', async () => {
    repository.find.mockResolvedValue([mockPost]);

    const result = await service.findAllPosts();
    expect(result).toEqual([mockPost]);
  });

  it('should return one post', async () => {
    repository.findOne.mockResolvedValue(mockPost);

    const result = await service.findOnePost(mockPost._id.toString());
    expect(result).toEqual(mockPost);
  });

  it('should throw if post not found', async () => {
    repository.findOne.mockResolvedValue(null);

    await expect(
      service.findOnePost(new ObjectId().toString())
    ).rejects.toThrow(NotFoundException);
  });

  it('should update a post', async () => {
    const updatedPost = { ...mockPost, title: 'Updated Title' };
    repository.findOne.mockResolvedValue(mockPost);
    repository.save.mockResolvedValue(updatedPost);

    const result = await service.updatePost(mockPost._id.toString(), {
      title: 'Updated Title',
      content: 'Test Content',
    });

    expect(result.title).toBe('Updated Title');
    expect(repository.save).toHaveBeenCalled();
  });

  it('should delete a post', async () => {
    repository.delete.mockResolvedValue({ affected: 1 });

    const result = await service.removePost(mockPost._id.toString());
    expect(result).toBe('post deleted successfully');
    expect(repository.delete).toHaveBeenCalled();
  });

  it('should throw on delete if post not found', async () => {
    repository.delete.mockResolvedValue({ affected: 0 });

    await expect(
      service.removePost(mockPost._id.toString())
    ).rejects.toThrow(NotFoundException);
  });
});
