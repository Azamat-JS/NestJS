import { Transform } from "class-transformer";
import { IsDateString, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongodb";

export class CreatePostDto {
      @IsString()
      title: string;
    
      @IsString()
      content: string;

      @IsString()
      @Transform(({value}) => new ObjectId(value))
      userId: string;
     
      @IsOptional()
      @IsDateString()
      createdAt?: Date;
}
