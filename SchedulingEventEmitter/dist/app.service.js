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
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const user_created_event_1 = require("./events/user-created.event");
const schedule_1 = require("@nestjs/schedule");
const axios_1 = require("axios");
let AppService = AppService_1 = class AppService {
    eventEmitter;
    schedulerRegistry;
    constructor(eventEmitter, schedulerRegistry) {
        this.eventEmitter = eventEmitter;
        this.schedulerRegistry = schedulerRegistry;
    }
    logger = new common_1.Logger(AppService_1.name);
    getHello() {
        return "Hello World!";
    }
    async createUser(body) {
        this.logger.log("Creating user...", body);
        const userId = "1234";
        this.eventEmitter.emit("user.created", new user_created_event_1.UserCreatedEvent(userId, body.email));
        const establishWSTimeout = setTimeout(() => this.establishWSConnection(userId), 5000);
        this.schedulerRegistry.addTimeout(`${userId}_establish_ws`, establishWSTimeout);
    }
    establishWSConnection(userId) {
        this.logger.log("Establishing ws connection with user", userId);
    }
    welcomeNewUser(payload) {
        this.logger.log("Welcoming new user...", payload.email);
    }
    async sendRequestToSomeUrl() {
        try {
            await this.intervalForever();
        }
        catch (error) {
            console.error('Error with interval');
        }
    }
    async intervalForever() {
        try {
            const response = await axios_1.default.get("http://localhost:4000/users", {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            });
            let count = 0;
            console.log(response.data, `${++count}`);
        }
        catch (error) {
        }
    }
};
exports.AppService = AppService;
__decorate([
    (0, event_emitter_1.OnEvent)("user.created"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_created_event_1.UserCreatedEvent]),
    __metadata("design:returntype", void 0)
], AppService.prototype, "welcomeNewUser", null);
__decorate([
    (0, schedule_1.Interval)(1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppService.prototype, "sendRequestToSomeUrl", null);
exports.AppService = AppService = AppService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        schedule_1.SchedulerRegistry])
], AppService);
//# sourceMappingURL=app.service.js.map