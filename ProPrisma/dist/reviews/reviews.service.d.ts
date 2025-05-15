import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
export declare class ReviewsService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createReviewDto: Prisma.ReviewCreateInput): Promise<{
        id: number;
        title: string;
        content: string;
        rating: number;
        productId: number;
    }>;
    findAll(): Promise<{
        id: number;
        title: string;
        content: string;
        rating: number;
        productId: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        content: string;
        rating: number;
        productId: number;
    } | null>;
    update(id: number, createReviewDto: Prisma.ReviewUpdateInput): Promise<{
        id: number;
        title: string;
        content: string;
        rating: number;
        productId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        content: string;
        rating: number;
        productId: number;
    }>;
}
