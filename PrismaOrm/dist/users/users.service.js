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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    createUser(createUserInput) {
        return this.prisma.user.create({
            data: {
                ...createUserInput,
                userSetting: {
                    create: {
                        smsEnabled: true,
                        notificationOn: false,
                    },
                },
            },
        });
    }
    getUsers() {
        return this.prisma.user.findMany({
            include: {
                userSetting: true,
            },
        });
    }
    getUserById(id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                userSetting: { select: { smsEnabled: true, notificationOn: true } },
                posts: true
            },
        });
    }
    async updateUserById(id, data) {
        const findUser = await this.getUserById(id);
        if (!findUser)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        if (data.username) {
            const findUser = await this.prisma.user.findUnique({
                where: { username: data.username },
            });
            if (findUser)
                throw new common_1.HttpException('Username is already taken', 400);
        }
        return this.prisma.user.update({ where: { id }, data });
    }
    async deleteUserById(id) {
        const findUser = await this.getUserById(id);
        if (!findUser)
            throw new common_1.HttpException('User not found', 404);
        await this.prisma.user.delete({ where: { id } });
        return `User with id: ${id} deleted successfully`;
    }
    async updateUserSettings(userId, data) {
        const findUser = await this.getUserById(userId);
        if (!findUser)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        if (!findUser.userSetting)
            throw new common_1.BadRequestException('The user doesn`t have user settings');
        return this.prisma.userSetting.update({ where: { userId }, data });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map