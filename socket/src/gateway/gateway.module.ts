import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { MyGateWay } from './gateway';

@Module({
  imports: [],
  controllers: [GatewayController],
  providers: [GatewayService, MyGateWay],
})
export class GatewayModule {}
