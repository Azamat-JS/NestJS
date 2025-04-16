import { CreateDrinkDto } from './create-drink.dto';
declare const UpdateDrinkDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDrinkDto>>;
export declare class UpdateDrinkDto extends UpdateDrinkDto_base {
    id: number;
}
export {};
