import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/shared/schema/Users";
import { CreateUserDto } from "./dto/createUserDto";
import { comparePassword, generateHashPassword } from "src/shared/utility/password-manager";
import { generateToken } from "src/shared/utility/token-generator";
import * as nodemailer from 'nodemailer'
import { SmsService } from "src/sms/sms.service";


@Injectable()
export class UserService {
  constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>,
                           private readonly smsService: SmsService){}

  // Get All Users
  async getAllUsers(){
    return this.userModel.find()
  };

  // send SMS
 async sendSMS(phone_number:string){
  const result = await this.smsService.sendSMS(phone_number)
  return result
 } 

  ////// Register
  async create(createUserDto:CreateUserDto):Promise<{}>{
    try {
        createUserDto.password = await generateHashPassword(createUserDto.password)
        const user = await this.userModel.findOne({email:createUserDto.email})
        if(user){
            throw new UnauthorizedException("User already exist")
        }
        
        const otpExpireTime = new Date();
        otpExpireTime.setMinutes(otpExpireTime.getMinutes() + 10)

        const generateOTP = Array.from({length: 6}, () => 
          Math.floor(Math.random() * 10)).join("");

          const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASS
            }
          });

          async function main(){
            const mailOptions = {
              from: process.env.EMAIL,
              to: createUserDto.email,
              subject: "Verify your email",
              html: `Dear ${createUserDto.name},<br>
                    Your verification code:<br><br>
                    <h1>${generateOTP}</h1>` 
            }
            const info = await transporter.sendMail(mailOptions)
          }
          main().catch(console.error);

        const newUser = await this.userModel.create({
            ...createUserDto,
            otp: generateOTP,
            otpExpireTime
        })

        return {success:true, message: 'Registered', result: newUser.email}
    } catch (error) {
        throw new InternalServerErrorException('Something went wrong. Please try again later')
    }
  }


  ///// Verify Email
  async verifiyEmail(email:string, otp: string){
    try {
        const user = await this.userModel.findOne({email});

        if(!user){
            throw new UnauthorizedException("You have not registered yet, please register and try again")
        }

        if(user.otp !== otp){
           throw new BadRequestException("Invalid OTP")
        }


        if(user.otpExpireTime < new Date()){
           throw new BadRequestException("OTP expired")
        }

        await this.userModel.updateOne({email}, {$set: {isVerified:true, otp:null, otpExpireTime:null}})

       return {
        success: true,
        message: 'Email verified successfully'
       }
    } catch (error) {
        throw new InternalServerErrorException('Something went wrong. Please try again later')
    }
  };

////// Login
  async login(email:string, password: string){
    try {
        const userExists = await this.userModel.findOne({email});

        if(!userExists){
            throw new UnauthorizedException("You have not registered yet, please register and try again")
        }
        
       if(!userExists.isVerified){
         throw new Error("Please verify your email")
       }

       const isPasswordMatch = await comparePassword(password, userExists.password)
       if(!isPasswordMatch){
        throw new BadRequestException("Invalid credentials")
       }

       const token = generateToken(userExists._id as string, userExists.type as string)

       return {
        success: true,
        message: 'Logged in successfully',
        user: {
           id: userExists._id as string, 
           name: userExists.name,
           email: userExists.email,
           type: userExists.type
        },
        token
       }
    } catch (error) {
        throw new InternalServerErrorException('Something went wrong. Please try again later')
    }
  }

  /// Forgot password
  async forgotPassword(email: string) {
    try {
        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const otpExpireTime = new Date();
        otpExpireTime.setMinutes(otpExpireTime.getMinutes() + 10);

        const resetOTP = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Reset Your Password",
            html: `Dear ${user.name},<br><br>
                   Your password reset OTP is: <h1>${resetOTP}</h1><br>
                   This OTP is valid for 10 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        await this.userModel.updateOne(
            { email },
            { $set: { otp: resetOTP, otpExpireTime } }
        );

        return { success: true, message: "Password reset OTP sent to your email" };
    } catch (error) {
        throw new InternalServerErrorException("Something went wrong. Please try again later");
    }
}

//// Reset password
async resetPassword(email: string, otp: string, newPassword: string) {
  try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
          throw new NotFoundException("User not found");
      }

      if (user.otp !== otp) {
          throw new BadRequestException("Invalid OTP");
      }

      if (user.otpExpireTime < new Date()) {
          throw new BadRequestException("OTP expired");
      }

      const hashedPassword = await generateHashPassword(newPassword);

      await this.userModel.updateOne(
          { email },
          { $set: { password: hashedPassword, otp: null, otpExpireTime: null } }
      );

      return { success: true, message: "Password reset successfully" };
  } catch (error) {
      throw new InternalServerErrorException("Something went wrong. Please try again later");
  }
}

}