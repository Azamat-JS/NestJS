import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { User, CreateUserDto, UpdateUserDto, PaginationDto} from '@app/common';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';

type Users = { users: User[] };
@Injectable()
export class UsersService implements OnModuleInit{
  onModuleInit() {
    for (let i = 0; i <= 100; i++) {
     this.create({username: randomUUID(), password: randomUUID(), age: 0})
      
    }
  }
  private readonly users: User[] = []
  create(createUserDto: CreateUserDto) {
    const user: User = {
      ...createUserDto,
      subscribed: false,
      age: createUserDto.age,
      socialMedia: {},
      id: randomUUID(),
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return {users: this.users};
  }

  findOne(id: string):User {
    const foundUser = this.users.find((user) => user.id === id);
    if(!foundUser){
      throw new NotFoundException(`User not found by id: ${id}`)
    }
    return foundUser
  }

  update(id: string, updateUserDto: UpdateUserDto):User {
    const userIndex = this.users.findIndex(user => user.id === id);
    if(userIndex !== -1){
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateUserDto
      };
      return this.users[userIndex]
    }
    throw new NotFoundException(`User not found by id: ${id}`)
  }

  remove(id: string) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if(userIndex !== -1){
      return this.users.splice(userIndex)[0]
    }
    throw new NotFoundException(`User not found by id: ${id}`)
  }
  queryUsers(paginationDtoStream: Observable<PaginationDto>): Observable<Users>{
    const subject = new Subject<Users>();

    const onNext = (paginationDto:PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: this.users.slice(start, start * paginationDto.skip),
      });
    };
    const onComplete = () => subject.complete();
    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete
    });
    return subject.asObservable();
  }
}
