import { PartialType } from "@nestjs/mapped-types";
import {IsDateString, IsNumber, IsString } from "class-validator";
import { CreateOrderDto } from "./create_order.dto";


export class UpdateOrderDto extends PartialType(CreateOrderDto) {
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