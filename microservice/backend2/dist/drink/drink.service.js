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
exports.DrinkService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const drink_entity_1 = require("./schema/drink.entity");
const mongoose_2 = require("mongoose");
let DrinkService = class DrinkService {
    drinkModel;
    constructor(drinkModel) {
        this.drinkModel = drinkModel;
    }
    create(createDrinkDto) {
        return this.drinkModel.create(createDrinkDto);
    }
    findAll() {
        return this.drinkModel.find();
    }
    async findOne(id) {
        const drink = await this.drinkModel.findOne({ id });
        if (!drink) {
            throw new common_1.NotFoundException(`Drink not found with id: ${id}`);
        }
        return drink;
    }
    async update(id, updateDrinkDto) {
        const drink = await this.drinkModel.updateOne({ id }, updateDrinkDto);
        if (!drink) {
            throw new common_1.NotFoundException(`Drink not found with id: ${id}`);
        }
        return drink;
    }
    async remove(id) {
        const drink = await this.drinkModel.deleteOne({ id });
        if (!drink) {
            throw new common_1.NotFoundException(`Drink not found with id: ${id}`);
        }
        return `Drink deleted successfully with id: ${id}`;
    }
};
exports.DrinkService = DrinkService;
exports.DrinkService = DrinkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(drink_entity_1.Drink.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DrinkService);
//# sourceMappingURL=drink.service.js.map