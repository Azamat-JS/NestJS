import { Injectable } from '@nestjs/common';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DrinkEntity } from './entities/drink.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DrinkService {
  constructor(@InjectRepository(DrinkEntity) private readonly drinkRepo: Repository<DrinkEntity>){}
  create(createDrinkDto: CreateDrinkDto) {
    return this.drinkRepo.save(createDrinkDto);
  }

  findAll() {
    return this.drinkRepo.find();
  }

  findOne(id: number) {
    return this.drinkRepo.findOneBy({id});
  }

  update(id: number, updateDrinkDto: UpdateDrinkDto) {
    return this.drinkRepo.update({id}, updateDrinkDto);
  }

  remove(id: number) {
    return this.drinkRepo.delete({id});
  }
}
