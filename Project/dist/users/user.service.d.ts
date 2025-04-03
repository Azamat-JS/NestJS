import { Model } from "mongoose";
import { Users } from "src/shared/schema/Users";
import { CreateUserDto } from "./dto/createUserDto";
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<Users>);
    create(createUserDto: CreateUserDto): Promise<{}>;
}
