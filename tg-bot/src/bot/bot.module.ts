import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from 'schema/food-schema';

@Module({
  imports: [MongooseModule.forFeature([{name:Food.name, schema:FoodSchema}])],
  providers: [BotService],
})
export class BotModule {}
