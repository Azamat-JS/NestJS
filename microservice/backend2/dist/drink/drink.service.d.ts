import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
import { Drink, DrinkDocument } from './schema/drink.entity';
import { Model } from 'mongoose';
export declare class DrinkService {
    private readonly drinkModel;
    constructor(drinkModel: Model<DrinkDocument>);
    create(createDrinkDto: CreateDrinkDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Drink> & Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, Drink> & Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Drink> & Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, Drink> & Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[], import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Drink> & Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, Drink> & Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, Drink> & Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "find", {}>;
    findOne(id: number): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Drink> & Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, Drink> & Drink & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: number, updateDrinkDto: UpdateDrinkDto): Promise<import("mongoose").UpdateWriteOpResult>;
    remove(id: number): Promise<string>;
}
