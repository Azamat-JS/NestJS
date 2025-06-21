import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateGroupPostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    description: string

    @IsString({each:true})
    @IsNotEmpty({each: true})
    @IsArray()
    @ArrayNotEmpty()
    userIds: string[]
}