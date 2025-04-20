import { IsNumber, isPhoneNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateOrderRequest {
    @IsString()
    name: string;

    @IsNumber()
    price:number;

    @IsString()
    phoneNumber:string
}