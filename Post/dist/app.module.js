"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const userEntity_1 = require("./user/userEntity");
const comments_module_1 = require("./comments/comments.module");
const comment_entity_1 = require("./comments/entities/comment.entity");
const posts_module_1 = require("./posts/posts.module");
const post_entity_1 = require("./posts/entities/post.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: "mongodb",
                host: 'localhost',
                url: process.env.MONGO_URI,
                synchronize: true,
                entities: [userEntity_1.User, comment_entity_1.Comment, post_entity_1.Post]
            }),
            user_module_1.UserModule,
            comments_module_1.CommentsModule,
            posts_module_1.PostsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map