import {IsDateString, IsNumber, IsString } from "class-validator";


export class CreateProductDto {
    @IsNumber()
    id:number;

    @IsString()
    title:string;

    @IsString()
    description:string;

    @IsString()
    category:string;

    @IsNumber()
    amount:number;

    @IsNumber()
    price:number;
    
    @IsDateString()
    createdAt?: string;
}