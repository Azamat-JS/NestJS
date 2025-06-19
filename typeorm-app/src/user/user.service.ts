import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>){}
 async create(createUserDto: CreateUserDto):Promise<UserEntity> {
    const newUser = this.userRepo.create(createUserDto);
    await this.userRepo.save(newUser)
    return newUser
  }

 async findAll():Promise<UserEntity[]> {
    return this.userRepo.find()
  }

 async findOne(id: string):Promise<UserEntity> {
    const foundUser = await this.userRepo.findOne({where: {id}})
    if(!foundUser) throw new NotFoundException('User not found')
    return foundUser
  }

 async update(id: string, updateUserDto: UpdateUserDto):Promise<UserEntity>{
      const updateUser =  await this.userRepo.update(id, updateUserDto)
    if(updateUser.affected === 0) throw new NotFoundException('User not found');
    const newUserUpdated = await this.userRepo.findOneBy({id});
    if(!newUserUpdated) throw new NotFoundException('User not found after updating')
    return newUserUpdated;
  }

 async remove(id: string):Promise<string> {
    const deleteUser = await this.userRepo.delete(id)
     if(deleteUser.affected === 0) throw new NotFoundException('User not found');
     return `User with id: ${id} deleted successfully`
  }

  // COUNT
  async countUsers():Promise<number>{
    return this.userRepo.count()
  }

  async countAdmins():Promise<number>{
    return this.userRepo.countBy({role: 'admin'})
  }

  async limitData(num:number){
    const users = this.userRepo.createQueryBuilder('users')
                                .limit(num)
                                .offset(5)
                                .orderBy('age', 'ASC')
                                .getMany()
    return users;
  }

  async select(){
    const users = this.userRepo.createQueryBuilder('users')
                               .select(['username', 'age'])
                               .getRawMany()
    
    return users
  }

  async groupData(){
    const users = await this.userRepo.createQueryBuilder('users')
                              .select('users.role', 'role')
                              .addSelect('ROUND(AVG(users.age))', 'averageAge')
                              .groupBy('users.role')
                              .getRawMany()

    return  users.reverse();
  }

  orderByAge(age: number){
    const users = this.userRepo.createQueryBuilder('users')
                                .where('users.age > :age', {age: age})
                                .getMany()

    return users
  }

 async search(letter: string, age: number){
    const users = await this.userRepo.createQueryBuilder('users')
                                .where('users.username ILIKE :username', {username: `%${letter}%`})
                                .andWhere('users.age > :age', {age: age})
                                .getMany()
    return users
  }
}
