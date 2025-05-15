"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Users_1 = require("../shared/schema/Users");
const password_manager_1 = require("../shared/utility/password-manager");
const token_generator_1 = require("../shared/utility/token-generator");
const nodemailer = require("nodemailer");
const sms_service_1 = require("../sms/sms.service");
let UserService = class UserService {
    userModel;
    smsService;
    constructor(userModel, smsService) {
        this.userModel = userModel;
        this.smsService = smsService;
    }
    async getAllUsers() {
        return this.userModel.find();
    }
    ;
    async sendSMS(phone_number) {
        const result = await this.smsService.sendSMS(phone_number);
        return result;
    }
    async create(createUserDto) {
        try {
            createUserDto.password = await (0, password_manager_1.generateHashPassword)(createUserDto.password);
            const user = await this.userModel.findOne({ email: createUserDto.email });
            if (user) {
                throw new common_1.UnauthorizedException("User already exist");
            }
            const otpExpireTime = new Date();
            otpExpireTime.setMinutes(otpExpireTime.getMinutes() + 10);
            const generateOTP = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASS
                }
            });
            async function main() {
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: createUserDto.email,
                    subject: "Verify your email",
                    html: `Dear ${createUserDto.name},<br>
                    Your verification code:<br><br>
                    <h1>${generateOTP}</h1>`
                };
                const info = await transporter.sendMail(mailOptions);
            }
            main().catch(console.error);
            const newUser = await this.userModel.create({
                ...createUserDto,
                otp: generateOTP,
                otpExpireTime
            });
            return { success: true, message: 'Registered', result: newUser.email };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Something went wrong. Please try again later');
        }
    }
    async verifiyEmail(email, otp) {
        try {
            const user = await this.userModel.findOne({ email });
            if (!user) {
                throw new common_1.UnauthorizedException("You have not registered yet, please register and try again");
            }
            if (user.otp !== otp) {
                throw new common_1.BadRequestException("Invalid OTP");
            }
            if (user.otpExpireTime < new Date()) {
                throw new common_1.BadRequestException("OTP expired");
            }
            await this.userModel.updateOne({ email }, { $set: { isVerified: true, otp: null, otpExpireTime: null } });
            return {
                success: true,
                message: 'Email verified successfully'
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Something went wrong. Please try again later');
        }
    }
    ;
    async login(email, password) {
        try {
            const userExists = await this.userModel.findOne({ email });
            if (!userExists) {
                throw new common_1.UnauthorizedException("You have not registered yet, please register and try again");
            }
            if (!userExists.isVerified) {
                throw new Error("Please verify your email");
            }
            const isPasswordMatch = await (0, password_manager_1.comparePassword)(password, userExists.password);
            if (!isPasswordMatch) {
                throw new common_1.BadRequestException("Invalid credentials");
            }
            const token = (0, token_generator_1.generateToken)(userExists._id, userExists.type);
            return {
                success: true,
                message: 'Logged in successfully',
                user: {
                    id: userExists._id,
                    name: userExists.name,
                    email: userExists.email,
                    type: userExists.type
                },
                token
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Something went wrong. Please try again later');
        }
    }
    async forgotPassword(email) {
        try {
            const user = await this.userModel.findOne({ email });
            if (!user) {
                throw new common_1.NotFoundException("User not found");
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
            await this.userModel.updateOne({ email }, { $set: { otp: resetOTP, otpExpireTime } });
            return { success: true, message: "Password reset OTP sent to your email" };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong. Please try again later");
        }
    }
    async resetPassword(email, otp, newPassword) {
        try {
            const user = await this.userModel.findOne({ email });
            if (!user) {
                throw new common_1.NotFoundException("User not found");
            }
            if (user.otp !== otp) {
                throw new common_1.BadRequestException("Invalid OTP");
            }
            if (user.otpExpireTime < new Date()) {
                throw new common_1.BadRequestException("OTP expired");
            }
            const hashedPassword = await (0, password_manager_1.generateHashPassword)(newPassword);
            await this.userModel.updateOne({ email }, { $set: { password: hashedPassword, otp: null, otpExpireTime: null } });
            return { success: true, message: "Password reset successfully" };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong. Please try again later");
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Users_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        sms_service_1.SmsService])
], UserService);
//# sourceMappingURL=user.service.js.map