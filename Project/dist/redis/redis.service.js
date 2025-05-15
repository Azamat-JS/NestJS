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
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
let RedisService = class RedisService {
    client;
    constructor() {
        this.client = (0, redis_1.createClient)({
            username: "default",
            password: "9cNy7hWp8dp9XfBEXUeBxpYjrNHqPtPg",
            socket: {
                host: "redis-19047.c14.us-east-1-3.ec2.redns.redis-cloud.com",
                port: 19047,
            },
        });
        this.client.on("error", (err) => {
            console.log(`Redis error: ${err}`);
        });
        this.client.connect();
        console.log("Redis connected");
    }
    async set(key, value, ttl) {
        await this.client.set(key, value);
        if (ttl) {
            await this.client.expire(key, ttl);
        }
    }
    async get(key) {
        return this.client.get(key);
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
//# sourceMappingURL=redis.service.js.map