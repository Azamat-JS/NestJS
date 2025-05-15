"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const productService = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ['amqps://peiedlbh:GGwLIYNm-VROkRjGZ4aKbbXbGOjnBR6Q@seal.lmq.cloudamqp.com/peiedlbh'],
            queue: 'product11_queue',
            queueOptions: { durable: false },
        },
    });
    const drinkService = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ['amqps://peiedlbh:GGwLIYNm-VROkRjGZ4aKbbXbGOjnBR6Q@seal.lmq.cloudamqp.com/peiedlbh'],
            queue: 'drink_queue',
            queueOptions: { durable: false },
        },
    });
    await productService.listen();
    await drinkService.listen();
    console.log(`Backend listening to product11_queue and drink_queue`);
}
bootstrap();
//# sourceMappingURL=app.js.map