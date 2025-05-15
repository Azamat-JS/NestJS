import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';
export declare class UsersService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createUser(createUserDto: Prisma.UserCreateInput): void;
    findAllUsers(): string;
    findOneUser(id: number): string;
    updateUser(id: number, updateUserDto: UpdateUserDto): string;
    removeUser(id: number): string;
}
