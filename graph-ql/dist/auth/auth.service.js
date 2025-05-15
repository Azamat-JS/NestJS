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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const auth_entity_1 = require("./entities/auth.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const nodemailer = require("nodemailer");
const crypto_1 = require("crypto");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    configService;
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async sendVerificationEmail(email, code) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verification code",
            html: `<p>Your verification code:</p><br><h1>${code}</h1><br><p>Enter this code to verify your account</p>`,
        };
        await transporter.sendMail(mailOptions);
    }
    async registerUser(userData) {
        if (!userData.password) {
            throw new Error("Password is required");
        }
        const salt = bcrypt.genSaltSync(10);
        userData.password = bcrypt.hashSync(userData.password, salt);
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }
    async login(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        const payload = { username: user.username, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET,
            expiresIn: '1d' });
        return { token };
    }
    async forgotPassword(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const resetToken = (0, crypto_1.randomBytes)(32).toString('hex');
        const resetTokenExpiry = new Date();
        resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1);
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await this.userRepository.save(user);
        await this.sendResetEmail(user.email, resetToken);
        return { message: 'Password reset link sent to your email' };
    }
    async sendResetEmail(email, resetToken) {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_PASS'),
            },
        });
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            text: `Click the link to reset your password: ${resetLink}`,
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        });
    }
    async resetPassword(token, newPassword) {
        const user = await this.userRepository.findOne({ where: { resetToken: token } });
        if (!user || !user.resetTokenExpiry || new Date() > user.resetTokenExpiry) {
            throw new common_1.HttpException('Invalid or expired token', common_1.HttpStatus.BAD_REQUEST);
        }
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(newPassword, salt);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await this.userRepository.save(user);
        return { message: 'Password reset successful' };
    }
    async findOneByUsername(username) {
        return this.userRepository.findOne({ where: { username } });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map