import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { Observable } from "rxjs";
export declare class RedisCacheInterceptor implements NestInterceptor {
    private readonly redisService;
    constructor(redisService: RedisService);
    intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>>;
}
