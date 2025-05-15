import { ProductService } from './product.service';
import { Prisma } from 'generated/prisma';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: Prisma.ProductCreateInput): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        sale: boolean;
        availability: import("generated/prisma").$Enums.Availability;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        sale: boolean;
        availability: import("generated/prisma").$Enums.Availability;
    }[]>;
    findOne(id: string): Promise<({
        description: {
            id: number;
            content: string;
            productId: number;
        } | null;
        reviews: {
            id: number;
            content: string;
            productId: number;
            title: string;
            rating: number;
        }[];
        tags: {
            id: number;
            content: string;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        sale: boolean;
        availability: import("generated/prisma").$Enums.Availability;
    }) | null>;
    update(id: string, updateProductDto: Prisma.ProductUpdateInput): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        sale: boolean;
        availability: import("generated/prisma").$Enums.Availability;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        sale: boolean;
        availability: import("generated/prisma").$Enums.Availability;
    }>;
}
