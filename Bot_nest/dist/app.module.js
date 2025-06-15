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
const app_service_1 = require("./app.service");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const LocalSession = require("telegraf-session-local");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const path_1 = require("path");
const task_entity_1 = require("./entities/task.entity");
const sessions = new LocalSession({ database: 'session_db.json' });
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
            nestjs_telegraf_1.TelegrafModule.forRoot({
                middlewares: [sessions.middleware()],
                token: process.env.TG_TOKEN,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                username: process.env.DB_USERNAME,
                entities: [task_entity_1.TaskEntity],
                migrations: [(0, path_1.join)(__dirname, '**', '*.migration.{ts.js}')],
                synchronize: true
            }),
            typeorm_1.TypeOrmModule.forFeature([task_entity_1.TaskEntity])
        ],
        providers: [app_service_1.AppService, app_controller_1.AppUpdate],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map