import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "src/shared/schema/Users";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
    imports: [MongooseModule.forFeature([{name:Users.name, schema:UsersSchema}])],
    controllers:[UserController],
    providers:[UserService],
    exports:[],
})

export class UserModule {}
