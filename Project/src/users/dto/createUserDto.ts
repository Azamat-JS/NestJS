import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { userTypes } from "src/shared/schema/Users";


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;

    @IsNotEmpty()
    @IsIn(Object.values(userTypes))
    type:userTypes;

    @IsOptional()
    @IsString()
    secretToken?:string;

    @IsOptional()
    @IsBoolean()
    isVerified?:boolean;
}