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
exports.ProductMicroServiceController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const microservices_1 = require("@nestjs/microservices");
let ProductMicroServiceController = class ProductMicroServiceController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    async event(data) {
        console.log(data);
        return "event from emit";
    }
    ;
    async salom(data) {
        console.log(data);
        return "salom from send";
    }
    ;
    create(createProductDto) {
        return this.productService.create(createProductDto);
    }
    findAll() {
        return this.productService.findAll();
    }
    findOne(id) {
        return this.productService.findOne(+id);
    }
    async update(updateProductDto) {
        if (!updateProductDto.id) {
            throw new common_1.NotFoundException('Product id not found');
        }
        const product = await this.productService.update(+updateProductDto.id, updateProductDto);
        return product;
    }
    remove(id) {
        return this.productService.remove(+id);
    }
};
exports.ProductMicroServiceController = ProductMicroServiceController;
__decorate([
    (0, microservices_1.EventPattern)("event"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductMicroServiceController.prototype, "event", null);
__decorate([
    (0, microservices_1.MessagePattern)("salom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductMicroServiceController.prototype, "salom", null);
__decorate([
    (0, microservices_1.EventPattern)("product_created"),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductMicroServiceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductMicroServiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductMicroServiceController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)("product_updated"),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductMicroServiceController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('product_deleted'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductMicroServiceController.prototype, "remove", null);
exports.ProductMicroServiceController = ProductMicroServiceController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductMicroServiceController);
//# sourceMappingURL=product-microservice.controller.js.map