import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(private redisService: RedisService) {}

    async createUser(user: User): Promise<void> {
        await this.redisService.set(`user:${user.id}`, user, 3600);
    }

    async getUser(id: string): Promise<User | null> {
        return await this.redisService.get<User>(`user:${id}`);
    }

    async updateUser(id: string, user: Partial<User>): Promise<void> {
        const existingUser = await this.getUser(id);
        if (existingUser) {
            const updatedUser = { ...existingUser, ...user };
            await this.redisService.set(`user:${id}`, updatedUser, 3600);
        }
    }

    async deleteUser(id: string): Promise<void> {
        await this.redisService.del(`user:${id}`);
    }

    async getAllUsers(): Promise<User[]> {
        const keys = await this.redisService.keys('user:*');
        const users: User[] = [];
        for (const key of keys) {
            const user = await this.redisService.get<User>(key);
            if (user) users.push(user);
        }
        return users;
    }
}