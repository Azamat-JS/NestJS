import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DrinkEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    likes:number;
}
