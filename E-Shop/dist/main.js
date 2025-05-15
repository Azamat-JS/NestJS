"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const core_1 = require("@nestjs/core");
const allExceptionFilter_1 = require("./Filters/allExceptionFilter");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(express.urlencoded({ extended: true }));
    app.useGlobalFilters(new allExceptionFilter_1.AllExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.setBaseViewsDir((0, path_1.join)(process.cwd(), 'src', 'views'));
    app.setViewEngine('ejs');
    const PORT = process.env.PORT || 5000;
    await app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map