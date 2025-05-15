import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DrinkService } from './drink.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';

@Controller()
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @MessagePattern('createDrink')
  create(@Payload() createDrinkDto: CreateDrinkDto) {
    return this.drinkService.create(createDrinkDto);
  }

  @MessagePattern('findAllDrink')
  findAll() {
    return this.drinkService.findAll();
  }

  @MessagePattern('findOneDrink')
  findOne(@Payload() id: number) {
    return this.drinkService.findOne(id);
  }

  @MessagePattern('updateDrink')
  update(@Payload() updateDrinkDto: UpdateDrinkDto) {
    return this.drinkService.update(updateDrinkDto.id, updateDrinkDto);
  }

  @MessagePattern('removeDrink')
  remove(@Payload() id: number) {
    return this.drinkService.remove(id);
  }
}
