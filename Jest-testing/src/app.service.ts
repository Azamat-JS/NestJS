import { Injectable } from '@nestjs/common';

export interface User {
  name: string;
  age: number;
}

@Injectable()
export class AppService {
  private users: User[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  createUser(name: string, age: number): User {
    const user: User = { name, age };
    this.users.push(user);
    return user;
  }

  findUser(name: string): User | undefined {
    return this.users.find(user => user.name === name);
  }

  updateUser(name: string, updatedData: Partial<User>): User | undefined {
    const user = this.findUser(name);
    if (!user) return undefined;

    Object.assign(user, updatedData);
    return user;
  }

  deleteUser(name: string): boolean {
    const index = this.users.findIndex(user => user.name === name);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }

  // For testing
  getUsers(): User[] {
    return this.users;
  }
}
