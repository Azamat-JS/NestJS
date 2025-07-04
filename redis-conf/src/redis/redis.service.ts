import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import {RedisClientType} from "redis";

@Injectable()
export class RedisService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @Inject('REDIS_CLIENT') private redisClient: RedisClientType,
    ) {}

    async set(key: string, value: any, ttl?: number): Promise<void> {
        await this.cacheManager.set(key, JSON.stringify(value), ttl);
    }

    async get<T>(key: string): Promise<T | null> {
        const value = await this.cacheManager.get<string>(key);
        return value ? JSON.parse(value) : null;
    }

    async del(key: string): Promise<void> {
        await this.cacheManager.del(key);
    }

    async keys(pattern: string): Promise<string[]> {
        return await this.redisClient.keys(pattern);
    }
}