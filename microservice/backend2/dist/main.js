"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const PORT = process.env.PORT || 5001;
    await app.listen(PORT, () => {
        console.log(`Backend2 is running on: ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map