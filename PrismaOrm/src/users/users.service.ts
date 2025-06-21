import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  createUser(createUserInput: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...createUserInput,
        userSetting: {
          create: {
            smsEnabled: true,
            notificationOn: false,
          },
        },
      },
    });
  }

  getUsers() {
    return this.prisma.user.findMany({
      include: {
        userSetting: true,
      },
    });
  }

  getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { 
        userSetting: { select: { smsEnabled: true, notificationOn: true } },
        posts:true
     },

    });
  }

  async updateUserById(id: string, data: Prisma.UserUpdateInput) {
    const findUser = await this.getUserById(id);
    if (!findUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (data.username) {
      const findUser = await this.prisma.user.findUnique({
        where: { username: data.username as string },
      });
      if (findUser) throw new HttpException('Username is already taken', 400);
    }
    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteUserById(id: string) {
    const findUser = await this.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    await this.prisma.user.delete({ where: { id } });
    return `User with id: ${id} deleted successfully`;
  }

 async updateUserSettings(userId: string, data: Prisma.UserSettingUpdateInput){
  const findUser =  await this.getUserById(userId);
  if(!findUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  if(!findUser.userSetting) throw new BadRequestException('The user doesn`t have user settings');
 return this.prisma.userSetting.update({where:{userId}, data})
  }
}
