/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/auth/src/auth.module.ts":
/*!**************************************!*\
  !*** ./apps/auth/src/auth.module.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_module_1 = __webpack_require__(/*! ./users/users.module */ "./apps/auth/src/users/users.module.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule],
        controllers: [],
        providers: [],
    })
], AuthModule);


/***/ }),

/***/ "./apps/auth/src/users/users.controller.ts":
/*!*************************************************!*\
  !*** ./apps/auth/src/users/users.controller.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./apps/auth/src/users/users.service.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    createUser(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    findAllUsers() {
        return this.usersService.findAll();
    }
    findOneUser(findOneUserDto) {
        return this.usersService.findOne(findOneUserDto.id);
    }
    updateUser(updateUserDto) {
        return this.usersService.update(updateUserDto.id, updateUserDto);
    }
    removeUser(findOneUserDto) {
        return this.usersService.remove(findOneUserDto.id);
    }
    queryUsers(paginationDtoStream) {
        return this.usersService.queryUsers(paginationDtoStream);
    }
};
exports.UsersController = UsersController;
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)(),
    (0, common_2.UsersServiceControllerMethods)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),

/***/ "./apps/auth/src/users/users.module.ts":
/*!*********************************************!*\
  !*** ./apps/auth/src/users/users.module.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./apps/auth/src/users/users.service.ts");
const users_controller_1 = __webpack_require__(/*! ./users.controller */ "./apps/auth/src/users/users.controller.ts");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),

/***/ "./apps/auth/src/users/users.service.ts":
/*!**********************************************!*\
  !*** ./apps/auth/src/users/users.service.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let UsersService = class UsersService {
    onModuleInit() {
        for (let i = 0; i <= 100; i++) {
            this.create({ username: (0, crypto_1.randomUUID)(), password: (0, crypto_1.randomUUID)(), age: 0 });
        }
    }
    users = [];
    create(createUserDto) {
        const user = {
            ...createUserDto,
            subscribed: false,
            age: createUserDto.age,
            socialMedia: {},
            id: (0, crypto_1.randomUUID)(),
        };
        this.users.push(user);
        return user;
    }
    findAll() {
        return { users: this.users };
    }
    findOne(id) {
        const foundUser = this.users.find((user) => user.id === id);
        if (!foundUser) {
            throw new common_1.NotFoundException(`User not found by id: ${id}`);
        }
        return foundUser;
    }
    update(id, updateUserDto) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            this.users[userIndex] = {
                ...this.users[userIndex],
                ...updateUserDto
            };
            return this.users[userIndex];
        }
        throw new common_1.NotFoundException(`User not found by id: ${id}`);
    }
    remove(id) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            return this.users.splice(userIndex)[0];
        }
        throw new common_1.NotFoundException(`User not found by id: ${id}`);
    }
    queryUsers(paginationDtoStream) {
        const subject = new rxjs_1.Subject();
        const onNext = (paginationDto) => {
            const start = paginationDto.page * paginationDto.skip;
            subject.next({
                users: this.users.slice(start, start * paginationDto.skip),
            });
        };
        const onComplete = () => subject.complete();
        paginationDtoStream.subscribe({
            next: onNext,
            complete: onComplete
        });
        return subject.asObservable();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);


/***/ }),

/***/ "./libs/common/src/constants/index.ts":
/*!********************************************!*\
  !*** ./libs/common/src/constants/index.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./packages */ "./libs/common/src/constants/packages.ts"), exports);


/***/ }),

/***/ "./libs/common/src/constants/packages.ts":
/*!***********************************************!*\
  !*** ./libs/common/src/constants/packages.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AUTH = void 0;
exports.AUTH = 'auth';


/***/ }),

/***/ "./libs/common/src/index.ts":
/*!**********************************!*\
  !*** ./libs/common/src/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./types */ "./libs/common/src/types/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./constants */ "./libs/common/src/constants/index.ts"), exports);


/***/ }),

/***/ "./libs/common/src/types/auth.ts":
/*!***************************************!*\
  !*** ./libs/common/src/types/auth.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.USERS_SERVICE_NAME = exports.AUTH_PACKAGE_NAME = exports.protobufPackage = void 0;
exports.UsersServiceControllerMethods = UsersServiceControllerMethods;
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
exports.protobufPackage = "auth";
exports.AUTH_PACKAGE_NAME = "auth";
function UsersServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = ["createUser", "findAllUsers", "findOneUser", "updateUser", "removeUser"];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)("UsersService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = ["queryUsers"];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("UsersService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.USERS_SERVICE_NAME = "UsersService";


/***/ }),

/***/ "./libs/common/src/types/index.ts":
/*!****************************************!*\
  !*** ./libs/common/src/types/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./auth */ "./libs/common/src/types/auth.ts"), exports);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*******************************!*\
  !*** ./apps/auth/src/main.ts ***!
  \*******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const auth_module_1 = __webpack_require__(/*! ./auth.module */ "./apps/auth/src/auth.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const path_1 = __webpack_require__(/*! path */ "path");
const common_1 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(auth_module_1.AuthModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            protoPath: (0, path_1.join)(__dirname, '../auth.proto'),
            package: common_1.AUTH
        }
    });
    await app.listen();
}
bootstrap();

})();

/******/ })()
;