import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class ProductController {
    private readonly productService;
    private readonly clientService;
    constructor(productService: ProductService, clientService: ClientProxy);
    create(createProductDto: CreateProductDto): Promise<CreateProductDto & import("./entities/product.entity").Product>;
    like(id: string): Promise<import("./entities/product.entity").Product>;
    findAll(): Promise<import("./entities/product.entity").Product[]>;
    findOne(id: string): Promise<import("./entities/product.entity").Product | null>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./entities/product.entity").Product | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
