import {IsDateString, IsNumber, IsString } from "class-validator";


export class CreateOrderDto {
    @IsNumber()
    id:number;

    @IsNumber()
    productId:number;

    @IsString()
    description:string;

    @IsNumber()
    amount:number;

    @IsNumber()
    totalPrice:number;
    
    @IsDateString()
    createdAt?: string;
}