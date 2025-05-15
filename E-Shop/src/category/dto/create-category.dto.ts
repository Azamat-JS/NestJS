// src/categories/dto/create-category.dto.ts
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
