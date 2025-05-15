import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { Observable, tap } from "rxjs";
import { response } from "express";

@Injectable()
export class RedisCacheInterceptor implements NestInterceptor{
    constructor(private readonly redisService: RedisService){}

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest()
        const key = `cache:${request.url}`;

        const cachedResponse = await this.redisService.get(key);
        if(cachedResponse){
            return new Observable((observe) => {
                observe.next(JSON.parse(cachedResponse));
                observe.complete()
            })
        }
        return next.handle().pipe(
            tap(async (response) => {
                await this.redisService.set(key, JSON.stringify(response), 5)
            })
        )
    }
}