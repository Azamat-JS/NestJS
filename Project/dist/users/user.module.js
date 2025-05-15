"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Users_1 = require("../shared/schema/Users");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const sms_module_1 = require("../sms/sms.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sms_module_1.SmsModule,
            mongoose_1.MongooseModule.forFeature([{ name: Users_1.Users.name, schema: Users_1.UsersSchema }])
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map