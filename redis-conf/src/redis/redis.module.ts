import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { RedisService } from './redis.service';
import { RedisClientType, createClient } from 'redis';

@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: async () => ({
                store: await redisStore({
                    url: 'redis://localhost:6379',
                }),
            }),
        }),
    ],
    providers: [
        RedisService,
        {
            provide: 'REDIS_CLIENT',
            useFactory: async () => {
                const client = createClient({
                    url: 'redis://localhost:6379',
                });
                await client.connect();
                return client;
            },
        },
    ],
    exports: [RedisService, CacheModule],
})
export class RedisModule {}