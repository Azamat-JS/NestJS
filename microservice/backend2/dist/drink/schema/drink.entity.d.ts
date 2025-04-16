import { HydratedDocument } from "mongoose";
export type DrinkDocument = HydratedDocument<Drink>;
export declare class Drink {
    id: number;
    name: string;
    price: number;
    likes: number;
}
export declare const DrinkSchema: import("mongoose").Schema<Drink, import("mongoose").Model<Drink, any, any, any, import("mongoose").Document<unknown, any, Drink> & Drink & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Drink, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Drink>> & import("mongoose").FlatRecord<Drink> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
