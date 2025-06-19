import { UserEntity } from "src/user/entities/user.entity";
export declare class ProductEntity {
    id: string;
    name: string;
    user: UserEntity;
    price: number;
}
