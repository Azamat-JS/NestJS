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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
let ProductService = class ProductService {
    productRepo;
    userRepo;
    constructor(productRepo, userRepo) {
        this.productRepo = productRepo;
        this.userRepo = userRepo;
    }
    async create(createProductDto) {
        const { user_id, name, price } = createProductDto;
        const foundUser = await this.userRepo.findOne({ where: { id: user_id } });
        if (!foundUser)
            throw new common_1.NotFoundException("user not found");
        const newProduct = this.productRepo.create({
            name,
            price,
            user: foundUser
        });
        await this.productRepo.save(newProduct);
        return newProduct;
    }
    findAll() {
        return `This action returns all product`;
    }
    async findOne(id) {
        const foundProduct = await this.productRepo.findOne({ where: { id }, relations: ['user'] });
        if (!foundProduct)
            throw new common_1.NotFoundException('product not found');
        return foundProduct;
    }
    update(id, updateProductDto) {
        return `This action updates a #${id} product`;
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], ProductService);
//# sourceMappingURL=product.service.js.map