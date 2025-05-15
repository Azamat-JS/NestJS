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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const microservices_1 = require("@nestjs/microservices");
let ProductController = class ProductController {
    productService;
    clientService;
    constructor(productService, clientService) {
        this.productService = productService;
        this.clientService = clientService;
    }
    async create(createProductDto) {
        const product = await this.productService.create(createProductDto);
        this.clientService.emit("product_created", product);
        return product;
    }
    async like(id) {
        const product = await this.productService.findOne(+id);
        if (!product) {
            throw new common_1.NotFoundException(`Product not found with id: ${id}`);
        }
        product.likes += 1;
        this.productService.update(+id, product);
        return product;
    }
    findAll() {
        this.clientService.emit('event', 'this is the emit event').subscribe((response) => {
            console.log(response);
        });
        this.clientService.send('event', 'this is the send event').subscribe((response) => {
            console.log(response);
        });
        return this.productService.findAll();
    }
    findOne(id) {
        return this.productService.findOne(+id);
    }
    async update(id, updateProductDto) {
        await this.productService.update(+id, updateProductDto);
        const product = await this.productService.findOne(+id);
        this.clientService.send("product_updated", product);
        return product;
    }
    remove(id) {
        this.clientService.send('product_deleted', id);
        return this.productService.remove(+id);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(":id/like"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "like", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "remove", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __param(1, (0, common_1.Inject)('PRODUCT_SERVICE')),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        microservices_1.ClientProxy])
], ProductController);
//# sourceMappingURL=product.controller.js.map