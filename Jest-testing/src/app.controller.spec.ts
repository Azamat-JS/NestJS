import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, User } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockAppService = {
    getHello: jest.fn(() => 'Hello World!'),
    createUser: jest.fn((name: string, age: number): User => ({ name, age })),
    findUser: jest.fn((name: string): User | undefined => ({ name, age: 25 })),
    updateUser: jest.fn((name: string, body: Partial<User>): User => ({
      name,
      age: body.age ?? 25,
    })),
    deleteUser: jest.fn((name: string) => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should return "Hello World!"', () => {
    expect(appController.getHello()).toBe('Hello World!');
    expect(appService.getHello).toHaveBeenCalled();
  });

  it('should create a user', () => {
    const user = appController.create({ name: 'Alice', age: 30 });
    expect(user).toEqual({ name: 'Alice', age: 30 });
    expect(appService.createUser).toHaveBeenCalledWith('Alice', 30);
  });

  it('should find a user', () => {
    const user = appController.findOne('Bob');
    expect(user).toEqual({ name: 'Bob', age: 25 });
    expect(appService.findUser).toHaveBeenCalledWith('Bob');
  });

  it('should update a user', () => {
    const updated = appController.update('Charlie', { age: 35 });
    expect(updated).toEqual({ name: 'Charlie', age: 35 });
    expect(appService.updateUser).toHaveBeenCalledWith('Charlie', { age: 35 });
  });

  it('should delete a user', () => {
    const deleted = appController.delete('Dave');
    expect(deleted).toBe(true);
    expect(appService.deleteUser).toHaveBeenCalledWith('Dave');
  });
});
