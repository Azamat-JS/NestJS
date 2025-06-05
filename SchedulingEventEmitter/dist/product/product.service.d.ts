import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { OrderCreateEvent } from 'src/events/order-create.events';
export declare class ProductService {
    create(createProductDto: CreateProductDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(payload: OrderCreateEvent): void;
}
