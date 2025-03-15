import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";
import * as config from "config";
import { ConfigModule } from "@nestjs/config";
import { FollowModule } from "./follow/follow.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
    }),
    MongooseModule.forRoot(config.get("MONGO_URI")),
    AuthModule,
    PostsModule,
    FollowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
