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
let UserService = class UserService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
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
            const generateOTP = Array.from({ length: 6 }, () => {
                Math.floor(Math.random() * 10);
            }).join("");
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
            await this.userModel.updateOne({ email }, { isVerified: true });
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Users_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map