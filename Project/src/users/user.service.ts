import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/shared/schema/Users";
import { CreateUserDto } from "./dto/createUserDto";
import { generateHashPassword } from "src/shared/utility/password-manager";


@Injectable()
export class UserService {
  constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>){}

  async create(createUserDto:CreateUserDto):Promise<{}>{
    try {
        createUserDto.password = await generateHashPassword(createUserDto.password)
        const user = await this.userModel.findOne({email:createUserDto.email})
        if(user){
            throw new UnauthorizedException("User already exist")
        }
        
        const otpExpireTime = new Date();
        otpExpireTime.setMinutes(otpExpireTime.getMinutes() + 10)

        const newUser = await this.userModel.create({
            ...createUserDto,
            otp: "123455",
            otpExpireTime
        })

        return {success:true, message: 'Registered', result: newUser.email}
    } catch (error) {
        throw new InternalServerErrorException('Something went wrong. Please try again later')
    }
  }
}