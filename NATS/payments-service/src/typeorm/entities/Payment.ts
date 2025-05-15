import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "payments"})
export class PaymentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('float')
    amount: number;
}