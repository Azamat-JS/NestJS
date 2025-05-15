import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";


export class CreateProductDto {

      @IsNotEmpty()
      @IsString()
      name: string;
    
      @IsNotEmpty()
      @IsString()
      category: string;
      
      @IsNotEmpty()
      @IsString()
      brand: string;
    
      @IsNotEmpty()
      @IsNumber()
      price: number;
    
      @IsOptional()
      @IsString()
      image?: string;
    
      @IsOptional()
      @IsObject()
      specs?: Record<string, any>;
    
      @IsOptional()
      @IsString()
      description?: string;
}
