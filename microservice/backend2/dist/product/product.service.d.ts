import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';
export declare class ProductService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    create(createProductDto: CreateProductDto): Promise<import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Product, "find", {}>;
    findOne(id: number): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Product, "findOne", {}>;
    update(id: number, updateProductDto: UpdateProductDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Product, "findOneAndUpdate", {}>;
    remove(id: number): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Product, "findOneAndDelete", {}>;
}
