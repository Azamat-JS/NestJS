import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<UserEntity>);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    remove(id: string): Promise<string>;
    countUsers(): Promise<number>;
    countAdmins(): Promise<number>;
    limitData(num: number): Promise<any>;
    select(): Promise<any>;
    groupData(): Promise<any>;
    orderByAge(age: number): any;
    search(letter: string, age: number): Promise<any>;
}
