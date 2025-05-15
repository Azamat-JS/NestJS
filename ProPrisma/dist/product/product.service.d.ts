import { Prisma } from "generated/prisma";
import { DatabaseService } from "src/database/database.service";
export declare class ProductService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
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
    findOne(id: number): Promise<({
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
    update(id: number, updateProductDto: Prisma.ProductUpdateInput): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        sale: boolean;
        availability: import("generated/prisma").$Enums.Availability;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        sale: boolean;
        availability: import("generated/prisma").$Enums.Availability;
    }>;
}
