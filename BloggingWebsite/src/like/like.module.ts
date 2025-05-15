import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Like, LikeSchema } from 'Schema/like-schema'
import { LikeService } from "./like.service";
import { LikeController } from "./like.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
