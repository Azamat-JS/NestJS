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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const path_1 = require("path");
const products_service_1 = require("../products/products.service");
const common_2 = require("@nestjs/common");
let UploadController = class UploadController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    async uploadSingleProductImage(file, productId) {
        const filePath = `/uploads/${file.filename}`;
        const serverUrl = `http://localhost:${process.env.PORT}`;
        try {
            await this.productService.addImageToProduct(productId, filePath);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to associate image with product', common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            message: 'Image uploaded successfully',
            fileUrl: `${serverUrl}/uploads/${file.filename}`,
        };
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('product-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                image: { type: 'string', format: 'binary' },
                productId: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Image uploaded successfully' }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_2.Body)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadSingleProductImage", null);
exports.UploadController = UploadController = __decorate([
    (0, swagger_1.ApiTags)('File uploads'),
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map