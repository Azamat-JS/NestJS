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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async create(createUserDto) {
        const newUser = this.userRepo.create(createUserDto);
        await this.userRepo.save(newUser);
        return newUser;
    }
    async findAll() {
        return this.userRepo.find();
    }
    async findOne(id) {
        const foundUser = await this.userRepo.findOne({ where: { id } });
        if (!foundUser)
            throw new common_1.NotFoundException('User not found');
        return foundUser;
    }
    async update(id, updateUserDto) {
        const updateUser = await this.userRepo.update(id, updateUserDto);
        if (updateUser.affected === 0)
            throw new common_1.NotFoundException('User not found');
        const newUserUpdated = await this.userRepo.findOneBy({ id });
        if (!newUserUpdated)
            throw new common_1.NotFoundException('User not found after updating');
        return newUserUpdated;
    }
    async remove(id) {
        const deleteUser = await this.userRepo.delete(id);
        if (deleteUser.affected === 0)
            throw new common_1.NotFoundException('User not found');
        return `User with id: ${id} deleted successfully`;
    }
    async countUsers() {
        return this.userRepo.count();
    }
    async countAdmins() {
        return this.userRepo.countBy({ role: 'admin' });
    }
    async limitData(num) {
        const users = this.userRepo.createQueryBuilder('users')
            .limit(num)
            .offset(5)
            .orderBy('age', 'ASC')
            .getMany();
        return users;
    }
    async select() {
        const users = this.userRepo.createQueryBuilder('users')
            .select(['username', 'age'])
            .getRawMany();
        return users;
    }
    async groupData() {
        const users = await this.userRepo.createQueryBuilder('users')
            .select('users.role', 'role')
            .addSelect('ROUND(AVG(users.age))', 'averageAge')
            .groupBy('users.role')
            .getRawMany();
        return users.reverse();
    }
    orderByAge(age) {
        const users = this.userRepo.createQueryBuilder('users')
            .where('users.age > :age', { age: age })
            .getMany();
        return users;
    }
    async search(letter, age) {
        const users = await this.userRepo.createQueryBuilder('users')
            .where('users.username ILIKE :username', { username: `%${letter}%` })
            .andWhere('users.age > :age', { age: age })
            .getMany();
        return users;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UserService);
//# sourceMappingURL=user.service.js.map