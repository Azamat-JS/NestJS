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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("../schemas/product.schema");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const likes_schema_1 = require("../schemas/likes.schema");
const comments_schema_1 = require("../schemas/comments.schema");
const category_schema_1 = require("../schemas/category.schema");
let ProductsService = class ProductsService {
    productModel;
    categoryModel;
    cacheManager;
    userModel;
    likeModel;
    commentModel;
    constructor(productModel, categoryModel, cacheManager, userModel, likeModel, commentModel) {
        this.productModel = productModel;
        this.categoryModel = categoryModel;
        this.cacheManager = cacheManager;
        this.userModel = userModel;
        this.likeModel = likeModel;
        this.commentModel = commentModel;
    }
    async create(createProductDto) {
        try {
            const product = await this.productModel.create(createProductDto);
            if (!product) {
                throw new common_1.HttpException('Product not created', common_1.HttpStatus.BAD_REQUEST);
            }
            return product;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: "Something went wrong" }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addImageToProduct(productId, imagePath) {
        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        product.image = imagePath;
        return product.save();
    }
    async findAll(page = 1, limit = 10) {
        try {
            if (page <= 0 || limit <= 0) {
                throw new Error("Page and limit must be positive integers.");
            }
            const skip = (page - 1) * limit;
            const [items, total] = await Promise.all([
                this.productModel.find().skip(skip).limit(limit).exec(),
                this.productModel.countDocuments(),
            ]);
            const totalPages = Math.ceil(total / limit);
            const result = {
                next: page * limit < total ? { next: page + 1, limit } : undefined,
                prev: page > 1 ? { prev: page - 1, limit } : undefined,
                totalPages,
                items,
            };
            return result;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: error.message || 'Something went wrong' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const product = await this.productModel.findById(id);
            if (!product) {
                throw new common_1.HttpException(`Product not found with id: ${id}`, common_1.HttpStatus.NOT_FOUND);
            }
            return product;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: "Something went wrong" }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateProductDto) {
        try {
            const product = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true, runValidators: true });
            if (!product) {
                throw new common_1.HttpException(`Product not found with id: ${id}`, common_1.HttpStatus.NOT_FOUND);
            }
            return product;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: "Something went wrong" }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const product = await this.productModel.findByIdAndDelete(id);
            if (!product) {
                throw new common_1.HttpException(`Product not found id: ${id}`, common_1.HttpStatus.NOT_FOUND);
            }
            return `Product with id: ${id} deleted successfully`;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: "Something went wrong" }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async likeProduct(productId, userId) {
        try {
            if (!userId || !productId) {
                throw new common_1.HttpException('User and product ids must be provided', common_1.HttpStatus.BAD_REQUEST);
            }
            const product = await this.productModel.findById(productId);
            if (!product) {
                throw new common_1.HttpException(`Product not found with id: ${productId}`, common_1.HttpStatus.NOT_FOUND);
            }
            const existingLike = await this.likeModel.findOne({ userId, productId });
            if (existingLike) {
                await existingLike.deleteOne();
                await this.productModel.findByIdAndUpdate(productId, {
                    $inc: { likesCount: -1 },
                });
                return `Product with id: ${productId} unliked successfully`;
            }
            else {
                await this.likeModel.create({ userId, productId });
                await this.productModel.findByIdAndUpdate(productId, {
                    $inc: { likesCount: 1 },
                });
                return `Product with id: ${productId} liked successfully`;
            }
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: 'Something went wrong' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async commentProduct(userId, productId, text) {
        try {
            if (!userId || !productId) {
                throw new common_1.HttpException('User and product ids must be provided', common_1.HttpStatus.BAD_REQUEST);
            }
            if (!text || text.trim() === '') {
                throw new common_1.HttpException('Comment text must be provided', common_1.HttpStatus.BAD_REQUEST);
            }
            const product = await this.productModel.findById(productId);
            if (!product) {
                throw new common_1.HttpException(`Product not found with id: ${productId}`, common_1.HttpStatus.NOT_FOUND);
            }
            await this.commentModel.create({ userId, productId, text });
            await this.productModel.findByIdAndUpdate(productId, {
                $inc: { commentsCount: 1 },
            });
            return `User with id: ${userId} left a comment on product with id: ${productId}`;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: 'Something went wrong' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async searchByName(name) {
        return this.productModel
            .find({ name: { $regex: new RegExp(name, 'i') } })
            .exec();
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(3, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(4, (0, mongoose_1.InjectModel)(likes_schema_1.Like.name)),
    __param(5, (0, mongoose_1.InjectModel)(comments_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model, Object, mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map