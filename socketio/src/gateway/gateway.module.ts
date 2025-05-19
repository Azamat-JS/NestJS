import { Module } from '@nestjs/common';
import { MyGateWay } from './gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [ MyGateWay],
})
export class GatewayModule {}
