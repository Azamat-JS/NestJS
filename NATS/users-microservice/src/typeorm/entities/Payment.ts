import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User";

@Entity({name: "payments"})
export class PaymentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('float')
    amount: number;

    @ManyToOne(() => UserEntity, (user) => user.payments)
    user: UserEntity;
}