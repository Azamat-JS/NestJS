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
exports.DrinkController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const drink_service_1 = require("./drink.service");
const create_drink_dto_1 = require("./dto/create-drink.dto");
const update_drink_dto_1 = require("./dto/update-drink.dto");
let DrinkController = class DrinkController {
    drinkService;
    constructor(drinkService) {
        this.drinkService = drinkService;
    }
    create(createDrinkDto) {
        return this.drinkService.create(createDrinkDto);
    }
    findAll() {
        return this.drinkService.findAll();
    }
    findOne(id) {
        return this.drinkService.findOne(id);
    }
    update(updateDrinkDto) {
        return this.drinkService.update(updateDrinkDto.id, updateDrinkDto);
    }
    remove(id) {
        return this.drinkService.remove(id);
    }
};
exports.DrinkController = DrinkController;
__decorate([
    (0, microservices_1.MessagePattern)('createDrink'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_drink_dto_1.CreateDrinkDto]),
    __metadata("design:returntype", void 0)
], DrinkController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('findAllDrink'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DrinkController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('findOneDrink'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DrinkController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('updateDrink'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_drink_dto_1.UpdateDrinkDto]),
    __metadata("design:returntype", void 0)
], DrinkController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('removeDrink'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DrinkController.prototype, "remove", null);
exports.DrinkController = DrinkController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [drink_service_1.DrinkService])
], DrinkController);
//# sourceMappingURL=drink.controller.js.map