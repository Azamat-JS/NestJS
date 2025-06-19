import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'products'})
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => UserEntity, {onDelete: 'CASCADE',})
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    @Column('float')
    price: number;
}
