import { UserService } from "./user.service";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./userEntity";
import { ObjectId } from "mongodb";
import { NotFoundException } from "@nestjs/common";

describe("UserService", () => {
  let service: UserService;
  let repository: any;

  const mockUser = {
    _id: new ObjectId(),
    username: "Ali",
    email: "ali@gmail.com",
    password: "ali123",
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return an array of users", async () => {
    const result = [mockUser];
    repository.find.mockResolvedValue(result);

    expect(await service.getAllUsers()).toBe(result);
  });

  it("should return a single user by ID", async () => {
    repository.findOne.mockResolvedValue(mockUser);

    const result = await service.getOne(mockUser._id.toString());
    expect(result).toEqual(mockUser);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { _id: new ObjectId(mockUser._id.toString()) },
    });
  });

  it("should throw NotFoundException if user not found", async () => {
    repository.findOne.mockResolvedValue(null);

    await expect(
      service.getOne(new ObjectId().toString())
    ).rejects.toThrow(NotFoundException);
  });

  it("should create a new user", async () => {
    const userData = {
      email: "ali@gmail.com",
      username: "Ali",
      password: "ali123",
    };

    repository.create.mockReturnValue(userData);
    repository.save.mockResolvedValue(mockUser);

    const result = await service.createUser(userData);
    expect(repository.create).toHaveBeenCalledWith(userData);
    expect(result).toEqual(mockUser);
  });

  it("should update an existing user", async () => {
    const updatedUser = {
      ...mockUser,
      username: "Updated Ali",
    };

    repository.findOne.mockResolvedValue(mockUser);
    repository.save.mockResolvedValue(updatedUser);

    const result = await service.updateUser(mockUser._id.toString(), {
      username: "Updated Ali",
      email: "ali@gmail.com",
      password: "ali123",
    });

    expect(result.username).toBe("Updated Ali");
    expect(repository.save).toHaveBeenCalled();
  });

  it("should delete an existing user", async () => {
    repository.delete.mockResolvedValue({ affected: 1 });

    const result = await service.deleteUser(mockUser._id.toString());
    expect(result).toBe("User deleted successfully");
    expect(repository.delete).toHaveBeenCalledWith(mockUser._id.toString());
  });

  it("should throw NotFoundException on delete if user doesn't exist", async () => {
    repository.delete.mockResolvedValue({ affected: 0 });

    await expect(
      service.deleteUser(mockUser._id.toString())
    ).rejects.toThrow(NotFoundException);
  });
});
