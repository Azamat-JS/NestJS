import {IsDateString, IsNumber, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create_product.dto";

export class UpdateProductDto extends PartialType(CreateProductDto) {
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