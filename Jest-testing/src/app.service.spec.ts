import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
    appService['users'] = [];
  });

  it('should return "Hello World!"', () => {
    expect(appService.getHello()).toBe('Hello World!');
  });

  it('should create a user', () => {
    const user = appService.createUser('Alice', 30);
    expect(user).toEqual({ name: 'Alice', age: 30 });
    expect(appService.getUsers()).toHaveLength(1);
  });

  it('should find a user by name', () => {
    appService.createUser('Bob', 25);
    const user = appService.findUser('Bob');
    expect(user).toEqual({ name: 'Bob', age: 25 });
  });

  it('should return undefined when updating a non-existent user', () => {
  const result = appService.updateUser('Ghost', { age: 50 });
  expect(result).toBeUndefined();
});

  it('should update a user\'s age', () => {
    appService.createUser('Charlie', 40);
    const updated = appService.updateUser('Charlie', { age: 41 });
    expect(updated).toEqual({ name: 'Charlie', age: 41 });
  });

  it('should delete a user', () => {
    appService.createUser('Dave', 22);
    const deleted = appService.deleteUser('Dave');
    const notDeleted = appService.deleteUser('sam');
    expect(deleted).toBe(true);
    expect(notDeleted).toBe(false)
    expect(appService.findUser('Dave')).toBeUndefined();
  });

  it('should return false when deleting a non-existent user', () => {
    expect(appService.deleteUser('Eve')).toBe(false);
  });
});
