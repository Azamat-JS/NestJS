import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").UserEntity>;
    findAll(): Promise<import("./entities/user.entity").UserEntity[]>;
    countUsers(): Promise<number>;
    countAdmins(): Promise<number>;
    limitUser(num: string): Promise<any>;
    groupData(): Promise<any>;
    groupUser(): Promise<any>;
    orderUser(age: string): any;
    search(body: {
        letter: string;
        age: number;
    }): Promise<any>;
    findOne(id: string): Promise<import("./entities/user.entity").UserEntity>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").UserEntity>;
    remove(id: string): Promise<string>;
}
