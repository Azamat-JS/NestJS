import { DrinkService } from './drink.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
export declare class DrinkController {
    private readonly drinkService;
    constructor(drinkService: DrinkService);
    create(createDrinkDto: CreateDrinkDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/drink.entity").Drink> & import("./schema/drink.entity").Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./schema/drink.entity").Drink> & import("./schema/drink.entity").Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/drink.entity").Drink> & import("./schema/drink.entity").Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./schema/drink.entity").Drink> & import("./schema/drink.entity").Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[], import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/drink.entity").Drink> & import("./schema/drink.entity").Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./schema/drink.entity").Drink> & import("./schema/drink.entity").Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, import("./schema/drink.entity").Drink> & import("./schema/drink.entity").Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "find", {}>;
    findOne(id: number): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/drink.entity").Drink> & import("./schema/drink.entity").Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./schema/drink.entity").Drink> & import("./schema/drink.entity").Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(updateDrinkDto: UpdateDrinkDto): Promise<import("mongoose").UpdateWriteOpResult>;
    remove(id: number): Promise<string>;
}
