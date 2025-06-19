import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<any>;
    findAll(): string;
    findOne(id: string): Promise<any>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): string;
}
