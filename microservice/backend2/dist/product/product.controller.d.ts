import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpService } from '@nestjs/axios';
export declare class ProductController {
    private readonly productService;
    private readonly httpService;
    constructor(productService: ProductService, httpService: HttpService);
    create(createProductDto: CreateProductDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    like(id: string): Promise<void>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[], import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "find", {}>;
    findOne(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "findOne", {}>;
    update(id: string, updateProductDto: UpdateProductDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "findOneAndDelete", {}>;
}
