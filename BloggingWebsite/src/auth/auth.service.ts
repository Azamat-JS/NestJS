import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './auth_dto/create-auth';
import { JwtService } from '@nestjs/jwt';
import { User } from 'Schema/user-schema';
import * as bcrypt from  'bcrypt'
import { LoginDto } from './auth_dto/login-auth';
import { UpdateUserDto } from './auth_dto/update-auth';
import { Model } from 'mongoose';
import * as config from 'config'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
      ) {}
    
      // Register
      async register(
        createUserDto: CreateUserDto
      ): Promise<{ message: string; data: Partial<User> }> {
        try {
          const { username, email, password, role} = createUserDto;
          const checkUser = await this.userModel.findOne({email})
    
          if (checkUser) {
            throw new HttpException({message: 'User already exists'}, HttpStatus.BAD_REQUEST);
          }
    
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(password, salt);
    
          const newUser = await this.userModel.create({
            username,
            email,
            password: hash,
            role
          });
          return { message: "User registered successfully", data: newUser };
        } catch (error) {
          if (error instanceof HttpException) {
            throw error;
          }
          console.error(error);
          throw new HttpException({message: "Something went wrong"}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    
      // Login
    
      async login(loginDto: LoginDto): Promise<{ message: string; token: string }> {
        try {
          const { email, password } = loginDto;
    
          const checkEmail = await this.userModel.findOne({ email });
          if (!checkEmail) {
            throw new HttpException({message: "Unauthorized Error, please sign up"}, HttpStatus.UNAUTHORIZED);
          }
    
          const isPasswordMatch = await bcrypt.compare(password, checkEmail.password);
          if (!isPasswordMatch) {
            throw new HttpException({message: "Invalid credentials"}, HttpStatus.BAD_REQUEST);
          }
    
          const payload = {
            id: checkEmail._id,
            email: checkEmail.email,
            role: checkEmail.role,
          };
          const accessToken = await this.jwtService.signAsync(payload, {secret: config.get<string>("JWT_SECRET"),
            expiresIn: '1d'
          });
    
          return { message: "Login successful", token: accessToken };
        } catch (error) {
          if (error instanceof HttpException) {
            throw error;
          }
    
          console.error(error);
          throw new HttpException({message: "Something went wrong"}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    
      // Get All Users
      async findAll(): Promise<User[]> {
       try {
        const users = await this.userModel.find().exec();
        if(!users){
          throw new HttpException({message: "Users not found"}, HttpStatus.NOT_FOUND)
        }
        return users;
       } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
        console.error(error);
        throw new HttpException({message: "Something went wrong"}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      }
      //Get one user
      async findOne(id: string): Promise<{ message: string; data: User }> {
      try {
        const user = await this.userModel.findById(id).exec();
    
        if (!user) throw new HttpException({message: "User not found"}, HttpStatus.NOT_FOUND);
    
        return { message: "User found", data: user };
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
        console.error(error);
        throw new HttpException({message: "Something went wrong"},HttpStatus.INTERNAL_SERVER_ERROR);
      }
      }
    
      // UPdate user
      async update(
        id: string,
        updateUserDto: UpdateUserDto
      ): Promise<{ message: string; data: User }> {
        
       try {
        const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new:true}).exec()
        if (!user) throw new HttpException({message: "User not found"}, HttpStatus.NOT_FOUND);
    
        return { message: "User updated successfully", data: user };

       } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
        console.error(error);
        throw new HttpException({message: "Something went wrong"},HttpStatus.INTERNAL_SERVER_ERROR);
       }
      }
    
      // Delete User
      async remove(id: string): Promise<string> {
        try {
          const user = await this.userModel.findByIdAndDelete(id);
        if (!user) throw new HttpException({message: "User not found"}, HttpStatus.NOT_FOUND);
    
        return "User deleted successfully";

        } catch (error) {
          if (error instanceof HttpException) {
            throw error;
          }
          console.error(error);
          throw new HttpException({message: "Something went wrong"},HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
}
