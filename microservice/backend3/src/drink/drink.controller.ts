import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, NotFoundException } from '@nestjs/common';
import { DrinkService } from './drink.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('drink')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService,
    @Inject('DRINK_SERVICE') private readonly clientService: ClientProxy
  ) {}

  @Post()
 async create(@Body() createDrinkDto: CreateDrinkDto) {
  const drink = await this.drinkService.create(createDrinkDto);
  this.clientService.emit("drink_created", drink);
  return drink
  }

  @Post(":id/like")
 async like(@Param() id: string) {
  const drink = await this.drinkService.findOne(+id)
  if(!drink){
    throw new NotFoundException(`Drink not found with id: ${id}`)
  }
  drink.likes += 1
  this.drinkService.update(+id, drink)
  return drink
  }

  @Get()
  findAll() {
    this.clientService.emit('event', 'this is the emit event').subscribe((response) => {
      console.log(response);
    });

    this.clientService.send('event', 'this is the send event').subscribe((response) => {
      console.log(response)      
    })
    return this.drinkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drinkService.findOne(+id);
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateDrinkDto: UpdateDrinkDto) {
  await this.drinkService.update(+id, updateDrinkDto);
  const drink = await this.drinkService.findOne(+id)
   this.clientService.send("drink_updated", drink)
   return drink
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.clientService.send('drink_deleted', id)
    return this.drinkService.remove(+id);
  }
}
