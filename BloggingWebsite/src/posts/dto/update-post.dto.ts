import { PartialType } from "@nestjs/swagger";
import { CreatePostDto } from "./create-post.dto";
import { IsString } from "class-validator";

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsString()
  descrtiption: string;

  @IsString()
  createBy: string;
}
