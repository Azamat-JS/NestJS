// src/categories/categories.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesService } from './category.service';
import { CategoriesController } from './category.controller';
import { Category, CategorySchema } from '../schemas/category.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
   ConfigModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_TIME') },
      }),
    }),
],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService, MongooseModule], 
})
export class CategoriesModule {}
