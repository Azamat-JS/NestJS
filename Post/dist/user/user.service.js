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
const typeorm_1 = require("@nestjs/typeorm");
const userEntity_1 = require("./userEntity");
const typeorm_2 = require("typeorm");
const mongodb_1 = require("mongodb");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAllUsers() {
        const users = this.userRepository.find();
        return users;
    }
    async createUser(userData) {
        const { email, username, password } = userData;
        const newUser = await this.userRepository.create({ email, username, password });
        const user = this.userRepository.save(newUser);
        return user;
    }
    async getOne(id) {
        const data = await this.userRepository.findOne({
            where: { _id: new mongodb_1.ObjectId(id) }
        });
        if (!data)
            throw new common_1.NotFoundException("user not found");
        return data;
    }
    async updateUser(id, userData) {
        const data = await this.getOne(id);
        data.username = userData.username;
        data.email = userData.email;
        data.password = userData.password;
        return await this.userRepository.save(data);
    }
    async deleteUser(id) {
        const user = await this.userRepository.delete(id);
        if (user.affected === 0)
            throw new common_1.NotFoundException("user not found");
        return 'User deleted successfully';
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(userEntity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map