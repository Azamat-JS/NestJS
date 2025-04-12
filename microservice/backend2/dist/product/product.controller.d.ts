import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    event(data: string): Promise<void>;
    create(createProductDto: CreateProductDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./schema/product.schema").Product, "find", {}>;
    findOne(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./schema/product.schema").Product, "findOne", {}>;
    update(id: string, updateProductDto: UpdateProductDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./schema/product.schema").Product, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./schema/product.schema").Product, "findOneAndDelete", {}>;
}
