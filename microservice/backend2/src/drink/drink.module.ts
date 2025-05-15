import { Module } from '@nestjs/common';
import { DrinkService } from './drink.service';
import { DrinkController } from './drink.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Drink, DrinkSchema } from './schema/drink.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: Drink.name, schema:DrinkSchema}])],
  controllers: [DrinkController],
  providers: [DrinkService],
})
export class DrinkModule {}
