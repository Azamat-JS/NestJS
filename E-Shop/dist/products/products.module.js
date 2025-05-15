"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const products_controller_1 = require("./products.controller");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const product_schema_1 = require("../schemas/product.schema");
const user_schema_1 = require("../schemas/user.schema");
const likes_schema_1 = require("../schemas/likes.schema");
const comments_schema_1 = require("../schemas/comments.schema");
const category_module_1 = require("../category/category.module");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: likes_schema_1.Like.name, schema: likes_schema_1.LikeSchema },
                { name: comments_schema_1.Comment.name, schema: comments_schema_1.CommentSchema },
            ]),
            category_module_1.CategoriesModule,
            config_1.ConfigModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_TIME },
            }),
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
        exports: [products_service_1.ProductsService]
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map