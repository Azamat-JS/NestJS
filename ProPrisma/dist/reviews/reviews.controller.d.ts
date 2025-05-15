import { ReviewsService } from './reviews.service';
import { Prisma } from 'generated/prisma';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
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
    findOne(id: string): Promise<{
        id: number;
        title: string;
        content: string;
        rating: number;
        productId: number;
    } | null>;
    update(id: string, updateReviewDto: Prisma.ReviewUpdateInput): Promise<{
        id: number;
        title: string;
        content: string;
        rating: number;
        productId: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        title: string;
        content: string;
        rating: number;
        productId: number;
    }>;
}
