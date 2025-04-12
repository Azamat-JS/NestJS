import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "src/shared/schema/Users";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SmsModule } from "src/sms/sms.module";


@Module({
    imports: [
        SmsModule,
        MongooseModule.forFeature([{name:Users.name, schema:UsersSchema}])],
    controllers:[UserController],
    providers:[UserService],
    exports:[],
})

export class UserModule {}
