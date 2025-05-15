import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Like, LikeDocument } from 'src/schemas/likes.schema';
import { Comment, CommentDocument } from 'src/schemas/comments.schema';
import { Category, CategoryDocument } from 'src/schemas/category.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,

    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,

    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
  ) {}
  async create(createProductDto: CreateProductDto):Promise<ProductDocument> {
    try {
      const product = await this.productModel.create(createProductDto)
      if(!product){
        throw new HttpException('Product not created', HttpStatus.BAD_REQUEST)
      }
      return product
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException({message: "Something went wrong"}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addImageToProduct(productId:string, imagePath:string):Promise<ProductDocument>{
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    product.image = imagePath;
    return product.save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<any> {
    try {
      
      if (page <= 0 || limit <= 0) {
        throw new Error("Page and limit must be positive integers.");
      }
  
      const skip: number = (page - 1) * limit;
  
      const [items, total] = await Promise.all([
        this.productModel.find().skip(skip).limit(limit).exec(),
        this.productModel.countDocuments(),
      ]);
      const totalPages = Math.ceil(total / limit);
  
      const result = {
        next: page * limit < total ? { next: page + 1, limit } : undefined,
        prev: page > 1 ? { prev: page - 1, limit } : undefined,
        totalPages,
        items,
      };

      return result;
    } catch (error) {
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        { message: error.message || 'Something went wrong' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

 async findOne(id: string):Promise<ProductDocument> {
   try {
    const product = await this.productModel.findById(id);
    if(!product){
      throw new HttpException(`Product not found with id: ${id}`, HttpStatus.NOT_FOUND)
    }
    return product
   } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }
    
    throw new HttpException({message: "Something went wrong"}, HttpStatus.INTERNAL_SERVER_ERROR);
   }
  }

 async update(id: string, updateProductDto: UpdateProductDto):Promise<ProductDocument> {
    try {
      const product = await this.productModel.findByIdAndUpdate(id, updateProductDto, {new:true, runValidators:true})
      if(!product){
        throw new HttpException(`Product not found with id: ${id}`, HttpStatus.NOT_FOUND)
      }

      return product
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException({message: "Something went wrong"}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }

 async remove(id: string):Promise<string> {
    try {
      const product = await this.productModel.findByIdAndDelete(id)
      if(!product){
        throw new HttpException(`Product not found id: ${id}`, HttpStatus.NOT_FOUND)
      }

      return `Product with id: ${id} deleted successfully`
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException({message: "Something went wrong"}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

async likeProduct(productId: string, userId: string): Promise<string> {
  try {
    if (!userId || !productId) {
      throw new HttpException('User and product ids must be provided', HttpStatus.BAD_REQUEST);
    }

    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new HttpException(`Product not found with id: ${productId}`, HttpStatus.NOT_FOUND);
    }

    const existingLike = await this.likeModel.findOne({ userId, productId });

    if (existingLike) {
      await existingLike.deleteOne();
      await this.productModel.findByIdAndUpdate(productId, {
        $inc: { likesCount: -1 },
      });
      return `Product with id: ${productId} unliked successfully`;
    } else {
      await this.likeModel.create({ userId, productId });
      await this.productModel.findByIdAndUpdate(productId, {
        $inc: { likesCount: 1 },
      });
      return `Product with id: ${productId} liked successfully`;
    }
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new HttpException({ message: 'Something went wrong' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

async commentProduct(userId: string, productId: string, text: string): Promise<string> {
  try {
    if (!userId || !productId) {
      throw new HttpException('User and product ids must be provided', HttpStatus.BAD_REQUEST);
    }

    if (!text || text.trim() === '') {
      throw new HttpException('Comment text must be provided', HttpStatus.BAD_REQUEST);
    }

    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new HttpException(`Product not found with id: ${productId}`, HttpStatus.NOT_FOUND);
    }

    await this.commentModel.create({ userId, productId, text });
    await this.productModel.findByIdAndUpdate(productId, {
      $inc: { commentsCount: 1 },
    });

    return `User with id: ${userId} left a comment on product with id: ${productId}`;
  } catch (error) {
  
    if (error instanceof HttpException) {
      throw error;
    }
    throw new HttpException({ message: 'Something went wrong' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

async searchByName(name: string): Promise<Product[]> {
  return this.productModel
    .find({ name: { $regex: new RegExp(name, 'i') } })
    .exec();
}
}
