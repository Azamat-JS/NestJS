"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const PORT = process.env.PORT || 4000;
    await app.listen(PORT, () => {
        console.log('server is running on: http://localhost:4004/graphql');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map