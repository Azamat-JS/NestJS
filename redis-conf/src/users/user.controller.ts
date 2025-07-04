import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async create(@Body() user: User) {
        await this.userService.createUser(user);
        return { message: 'User created' };
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        const user = await this.userService.getUser(id);
        return user || { message: 'User not found' };
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: Partial<User>) {
        await this.userService.updateUser(id, user);
        return { message: 'User updated' };
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.userService.deleteUser(id);
        return { message: 'User deleted' };
    }

    @Get()
    async getAll() {
        return await this.userService.getAllUsers();
    }
}