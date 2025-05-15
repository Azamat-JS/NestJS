import { Transform } from "class-transformer";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongodb";

export class CreateCommentDto {

  @IsString()
  text: string;

  @IsString()
  @Transform(({value}) => new ObjectId(value))
  userId: string;

  @IsString()
  @Transform(({value}) => new ObjectId(value))
  postId: string;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;
}
