import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
export declare class ProductService {
    private readonly productRepo;
    constructor(productRepo: Repository<Product>);
    create(createProductDto: CreateProductDto): Promise<CreateProductDto & Product>;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product | null>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
