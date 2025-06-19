import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>,
 @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
){}
 async create(createProductDto: CreateProductDto) {
  const {user_id, name, price} = createProductDto
  const foundUser = await this.userRepo.findOne({where: {id: user_id}})
  if(!foundUser) throw new NotFoundException("user not found")
    const newProduct = this.productRepo.create({
      name,
      price,
      user: foundUser
    })
  await this.productRepo.save(newProduct)
  return newProduct
  }

  findAll() {
    return `This action returns all product`;
  }

 async findOne(id: string) {
    const foundProduct = await this.productRepo.findOne({where: {id}, relations:['user']})
    if(!foundProduct) throw new NotFoundException('product not found')
      return foundProduct
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
