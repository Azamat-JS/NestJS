"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDrinkDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_drink_dto_1 = require("./create-drink.dto");
class UpdateDrinkDto extends (0, mapped_types_1.PartialType)(create_drink_dto_1.CreateDrinkDto) {
    id;
}
exports.UpdateDrinkDto = UpdateDrinkDto;
//# sourceMappingURL=update-drink.dto.js.map