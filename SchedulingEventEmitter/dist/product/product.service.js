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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const order_create_events_1 = require("../events/order-create.events");
const create_user_dto_1 = require("../dto/create-user.dto");
let ProductService = class ProductService {
    create(createProductDto) {
        return 'This action adds a new product';
    }
    findAll() {
        return `This action returns all product`;
    }
    findOne(id) {
        return `This action returns a #${id} product`;
    }
    update(id, updateProductDto) {
        return `This action updates a #${id} product`;
    }
    remove(payload) {
        console.log('Product ordered and should be deleted from the DB', payload);
    }
    handleUserCreating(payload) {
        console.log(`Product service received data from app.service ${payload.email} ${payload.password}`);
    }
};
exports.ProductService = ProductService;
__decorate([
    (0, event_emitter_1.OnEvent)('order-created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_create_events_1.OrderCreateEvent]),
    __metadata("design:returntype", void 0)
], ProductService.prototype, "remove", null);
__decorate([
    (0, event_emitter_1.OnEvent)('user.creating'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], ProductService.prototype, "handleUserCreating", null);
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)()
], ProductService);
//# sourceMappingURL=product.service.js.map