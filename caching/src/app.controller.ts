import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @CacheKey('some_route')
  @CacheTTL(10000)
 async getHello() {
    return this.appService.getHello();
  }
}
