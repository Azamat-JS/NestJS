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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ProductService = class ProductService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(createProductDto) {
        return this.databaseService.product.create({ data: createProductDto });
    }
    async findAll() {
        return this.databaseService.product.findMany({});
    }
    async findOne(id) {
        return this.databaseService.product.findUnique({
            where: { id }, include: {
                description: true, tags: true, reviews: true
            }
        });
    }
    async update(id, updateProductDto) {
        return this.databaseService.product.update({
            where: { id }, data: updateProductDto
        });
    }
    async remove(id) {
        return this.databaseService.product.delete({
            where: { id }
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ProductService);
//# sourceMappingURL=product.service.js.map