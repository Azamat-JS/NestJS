import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Product, ProductSchema } from '../schemas/product.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { Like, LikeSchema } from '../schemas/likes.schema';
import { Comment, CommentSchema } from '../schemas/comments.schema';
import { CategoriesModule } from 'src/category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
      { name: Like.name, schema: LikeSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    CategoriesModule,
    ConfigModule,
    JwtModule.register({
      
        secret:process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_TIME },
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
