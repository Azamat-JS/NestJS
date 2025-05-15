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
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const create_auth_input_1 = require("./dto/create-auth.input");
const res_auth_1 = require("./entities/res.auth");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
let AuthResolver = class AuthResolver {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    sayHello() {
        return 'Hello, GraphQL!';
    }
    async register(createUserDto) {
        try {
            const { username, email, password, role } = createUserDto;
            const checkUser = await this.authService.findOneByUsername(username);
            if (checkUser) {
                throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
            }
            const generatePassword = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
            await this.authService.sendVerificationEmail(email, generatePassword);
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = await this.authService.registerUser({
                username,
                email,
                password: hash,
                role,
                verify_code: generatePassword
            });
            return { message: 'User registered successfully', data: newUser };
        }
        catch (error) {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(email, password) {
        const { token } = await this.authService.login(email, password);
        return token;
    }
    async forgotPassword(email) {
        await this.authService.forgotPassword(email);
        return 'Password reset link sent to your email';
    }
    async resetPassword(token, newPassword) {
        await this.authService.resetPassword(token, newPassword);
        return 'Password reset successful';
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AuthResolver.prototype, "sayHello", null);
__decorate([
    (0, graphql_1.Mutation)(() => res_auth_1.RegisterResponse),
    __param(0, (0, graphql_1.Args)('createUserDto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_input_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "forgotPassword", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('token')),
    __param(1, (0, graphql_1.Args)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "resetPassword", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map