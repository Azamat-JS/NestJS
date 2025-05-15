import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/loginDto";
import { InvalidCredentialsException } from "filter/invalid-credentials";
import { Express } from "express";
import { S3Service } from "src/s3/s3.service";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,

    private s3Service: S3Service
  ) {}

  // Register
  async register(
    createUserDto: CreateUserDto
  ): Promise<{ message: string; data: Partial<User> }> {
    try {
      const { username, email, password, role } = createUserDto;
      const checkUser = await this.userModel.findOne({ where: { username } });

      if (checkUser) {
        throw new HttpException(
          { message: "User already exists" },
          HttpStatus.BAD_REQUEST
        );
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = await this.userModel.create({
        username,
        email,
        password: hash,
        role,
      });
      return { message: "User registered successfully", data: newUser };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new HttpException(
        { message: "Something went wrong" },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Login

  async login(loginDto: LoginDto): Promise<{ message: string; token: string }> {
    try {
      const { email, password } = loginDto;

      const checkEmail = await this.userModel.findOne({ where: { email } });
      if (!checkEmail) {
        throw new InvalidCredentialsException();
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        checkEmail.dataValues.password
      );
      if (!isPasswordMatch) {
        throw new InvalidCredentialsException();
      }

      const payload = {
        id: checkEmail.dataValues.id,
        email: checkEmail.dataValues.email,
        role: checkEmail.dataValues.role,
      };
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: "1d",
      });

      return { message: "Login successful", token: accessToken };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error(error);
      throw new HttpException(
        { message: "Something went wrong" },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Get All Users
  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.findAll();
      if (users.length === 0) {
        throw new HttpException(
          { message: "Users not found" },
          HttpStatus.NOT_FOUND
        );
      }
      return users;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new HttpException(
        { message: "Something went wrong" },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  //Get one user
  async findOne(id: string): Promise<{ message: string; data: User }> {
    try {
      const user = await this.userModel.findOne({ where: { id } });

      if (!user)
        throw new HttpException(
          { message: "User not found" },
          HttpStatus.NOT_FOUND
        );

      return { message: "User found", data: user };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new HttpException(
        { message: "Something went wrong" },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // UPdate user
  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<{ message: string; data: User }> {
    try {
      const user = await this.userModel.findOne({ where: { id } });
      if (!user)
        throw new HttpException(
          { message: "User not found" },
          HttpStatus.NOT_FOUND
        );

      await user.update({ ...updateUserDto });
      await user.reload();

      return { message: "User updated successfully", data: user };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new HttpException(
        { message: "Something went wrong" },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Delete User
  async remove(id: string): Promise<string> {
    try {
      const user = await this.userModel.findOne({ where: { id } });
      if (!user)
        throw new HttpException(
          { message: "User not found" },
          HttpStatus.NOT_FOUND
        );

      await this.userModel.destroy({ where: { id } });
      return "User deleted successfully";
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new HttpException(
        { message: "Something went wrong" },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async addFileToUsers(file: Express.Multer.File, id: string) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new InvalidCredentialsException();
    }
    const key = `${file.fieldname}${Date.now()}`;
    const imageUrl = await this.s3Service.uploadFile(file, key);

    await user.update({ image: imageUrl });
    await user.reload();
    return imageUrl;
  }
}
