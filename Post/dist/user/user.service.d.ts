import { User } from './userEntity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getAllUsers(): Promise<User[]>;
    createUser(userData: any): Promise<User>;
    getOne(id: string): Promise<User>;
    updateUser(id: string, userData: any): Promise<User>;
    deleteUser(id: string): Promise<string>;
}
