import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
export declare class ProductService {
    private readonly productRepo;
    private readonly userRepo;
    constructor(productRepo: Repository<ProductEntity>, userRepo: Repository<UserEntity>);
    create(createProductDto: CreateProductDto): Promise<any>;
    findAll(): string;
    findOne(id: string): Promise<any>;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
