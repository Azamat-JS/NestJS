import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Drink, DrinkDocument } from './schema/drink.entity';
import { Model } from 'mongoose';

@Injectable()
export class DrinkService {
  constructor(@InjectModel(Drink.name) private readonly drinkModel: Model<DrinkDocument>){}
  create(createDrinkDto: CreateDrinkDto) {
    return this.drinkModel.create(createDrinkDto);
  }

  findAll() {
    return this.drinkModel.find();
  }

 async findOne(id: number) {
    const drink = await this.drinkModel.findOne({id});
    if(!drink){
      throw new NotFoundException(`Drink not found with id: ${id}`)
    }
    return drink
  }

 async update(id: number, updateDrinkDto: UpdateDrinkDto) {
    const drink = await this.drinkModel.updateOne({id}, updateDrinkDto);
    if(!drink){
      throw new NotFoundException(`Drink not found with id: ${id}`)
    }
    return drink
  }

 async remove(id: number) {
    const drink = await this.drinkModel.deleteOne({id});
    if(!drink){
      throw new NotFoundException(`Drink not found with id: ${id}`)
    }
    return `Drink deleted successfully with id: ${id}`
  }
}
