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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../schemas/user.schema");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
let UsersService = class UsersService {
    userModel;
    jwtService;
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        const { name, email, password, role } = createUserDto;
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const expiresInMinutes = 10;
        const verificationCodeExpires = new Date(Date.now() + expiresInMinutes * 60 * 1000);
        const user = new this.userModel({
            name,
            email,
            password,
            role,
            isVerified: false,
            verificationCode,
            verificationCodeExpires,
        });
        await user.save();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: `"Your E-Commerce website" <${process.env.EMAIL}>`,
            to: email,
            subject: 'Email Verification',
            text: `Dear ${name},\n\nYour verification code is: ${verificationCode}\n\nThanks!`,
        };
        try {
            await transporter.sendMail(mailOptions);
            return `Verification code sent to ${email}`;
        }
        catch (mailError) {
            await this.userModel.deleteOne({ email });
            throw new common_1.HttpException('Failed to send verification email. Please try again.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyUser(verifyUserDto) {
        const { email, verificationCode } = verifyUserDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (user.isVerified) {
            throw new common_1.HttpException('User already verified', common_1.HttpStatus.BAD_REQUEST);
        }
        if (user.verificationCodeExpires < new Date()) {
            throw new common_1.HttpException('Verification code has expired', common_1.HttpStatus.BAD_REQUEST);
        }
        if (user.verificationCode !== verificationCode) {
            throw new common_1.HttpException('Invalid verification code', common_1.HttpStatus.BAD_REQUEST);
        }
        user.isVerified = true;
        user.verificationCode = 0;
        await user.save();
        return 'User verified successfully';
    }
    async login(loginDto) {
        try {
            const { email, password } = loginDto;
            const user = await this.userModel.findOne({ email });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
            }
            if (!user.isVerified) {
                throw new common_1.HttpException('Your email is not verified', common_1.HttpStatus.BAD_REQUEST);
            }
            const payload = { sub: user._id, email: user.email, role: user.role };
            const accessToken = await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: process.env.JWT_TIME,
            });
            return {
                message: `${email} successfully logged in`,
                accessToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: 'Something went wrong' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async forgetPassword(email) {
        try {
            const user = await this.userModel.findOne({ email });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            const token = crypto.randomBytes(32).toString('hex');
            const expires = new Date(Date.now() + 1000 * 60 * 15);
            user.resetPasswordToken = token;
            user.resetPasswordExpires = expires;
            await user.save();
            const resetLink = `${process.env.APP_URL}/users/reset-password/${token}`;
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASS,
                },
            });
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Password Reset',
                html: `<p>You requested a password reset.</p>
           <p>Click here to reset: <a href="${resetLink}">Click this to change your password</a></p>
           <p>This link expires in 15 minutes.</p>`,
            };
            await transporter.sendMail(mailOptions);
            return 'Reset password link sent to your email.';
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: 'Something went wrong' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async accessToPassword(token) {
        try {
            const user = await this.userModel.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: new Date() },
            });
            if (!user) {
                throw new common_1.HttpException('Token is invalid or has expired', common_1.HttpStatus.BAD_REQUEST);
            }
            return { token };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: 'Something went wrong' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async resetPassword(body) {
        try {
            const { token, password } = body;
            const user = await this.userModel.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: new Date() },
            });
            if (!user) {
                throw new common_1.HttpException('Token invalid or expired', common_1.HttpStatus.BAD_REQUEST);
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            await user.save();
            return 'Password reset successful. You can now log in.';
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            console.error(error);
            throw new common_1.HttpException({ message: 'Something went wrong' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const [items, total] = await Promise.all([
                this.userModel.find().skip(skip).limit(limit).exec(),
                this.userModel.countDocuments(),
            ]);
            const totalPages = Math.ceil(total / limit);
            const result = {
                next: page * limit < total ? { next: page + 1, limit } : undefined,
                prev: page > 1 ? { prev: page - 1, limit } : undefined,
                totalPages,
                items,
            };
            return result;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: 'Something went wrong' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                throw new common_1.HttpException(`User not found with id: ${id}`, common_1.HttpStatus.NOT_FOUND);
            }
            return user;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: 'Something went wrong' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateUserDto) {
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true, runValidators: true });
            if (!updatedUser) {
                throw new common_1.HttpException(`User not found with id: ${id}`, common_1.HttpStatus.NOT_FOUND);
            }
            return updatedUser;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: 'Something went wrong during user update' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const user = await this.userModel.findByIdAndDelete(id);
            if (!user) {
                throw new common_1.HttpException(`User not found with id: ${id}`, common_1.HttpStatus.NOT_FOUND);
            }
            return `User with id: ${id} deleted successfully`;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: 'Something went wrong' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async searchByName(name) {
        return this.userModel
            .find({ name: { $regex: new RegExp(name, 'i') } })
            .exec();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map