import {
  HttpException,
  HttpStatus,
  Injectable,
  Res,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/loginDto';
import * as nodemailer from 'nodemailer';
import { VerifyUserDto } from './dto/verifyDto';
import * as crypto from 'crypto';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async register(createUserDto: CreateUserDto): Promise<string> {
    const { name, email, password, role } = createUserDto;

    // Check if user exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const expiresInMinutes = 10;
    const verificationCodeExpires = new Date(
      Date.now() + expiresInMinutes * 60 * 1000,
    );
    // Create user
    const user = new this.userModel({
      name,
      email,
      password,
      role,
      isVerified: false,
      verificationCode,
      verificationCodeExpires,
    });

    await user.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Your E-Commerce website" <${process.env.EMAIL}>`,
      to: email,
      subject: 'Email Verification',
      text: `Dear ${name},\n\nYour verification code is: ${verificationCode}\n\nThanks!`,
    };
    try {
      await transporter.sendMail(mailOptions);
      return `Verification code sent to ${email}`;
    } catch (mailError) {
      await this.userModel.deleteOne({ email });
      
      throw new HttpException(
        'Failed to send verification email. Please try again.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyUser(verifyUserDto: VerifyUserDto): Promise<string> {
    const { email, verificationCode } = verifyUserDto;

    // Find user by email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Check if already verified
    if (user.isVerified) {
      throw new HttpException('User already verified', HttpStatus.BAD_REQUEST);
    }

    if (user.verificationCodeExpires < new Date()) {
      throw new HttpException(
        'Verification code has expired',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Match verification code
    if (user.verificationCode !== verificationCode) {
      throw new HttpException(
        'Invalid verification code',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Update user status
    user.isVerified = true;
    user.verificationCode = 0; // Optional: clear the code after verification
    await user.save();

    return 'User verified successfully';
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ message: string; accessToken: string; user: object }> {
    try {
      const { email, password } = loginDto;
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      if (!user.isVerified) {
        throw new HttpException(
          'Your email is not verified',
          HttpStatus.BAD_REQUEST,
        );
      }

      const payload = { sub: user._id, email: user.email, role: user.role };
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_TIME,
      });

      return {
        message: `${email} successfully logged in`,
        accessToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        { message: 'Something went wrong' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async forgetPassword(email: string): Promise<string> {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const token = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 1000 * 60 * 15); // 15 min

      user.resetPasswordToken = token;
      user.resetPasswordExpires = expires;
      await user.save();

      const resetLink = `${process.env.APP_URL}/users/reset-password/${token}`;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset',
        html: `<p>You requested a password reset.</p>
           <p>Click here to reset: <a href="${resetLink}">Click this to change your password</a></p>
           <p>This link expires in 15 minutes.</p>`,
      };

      await transporter.sendMail(mailOptions);

      return 'Reset password link sent to your email.';
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        { message: 'Something went wrong' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async accessToPassword(token: string) {
    try {
      const user = await this.userModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() },
      });

      if (!user) {
        throw new HttpException(
          'Token is invalid or has expired',
          HttpStatus.BAD_REQUEST,
        );
      }

      return { token };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        { message: 'Something went wrong' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetPassword(body): Promise<string> {
    try {
      const { token, password } = body;

      const user = await this.userModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() },
      });

      if (!user) {
        throw new HttpException(
          'Token invalid or expired',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      await user.save();
  

      return 'Password reset successful. You can now log in.';
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new HttpException(
        { message: 'Something went wrong' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<any> {
    try {
      const skip = (page - 1) * limit;
      const [items, total] = await Promise.all([
        this.userModel.find().skip(skip).limit(limit).exec(),
        this.userModel.countDocuments(),
      ]);
      const totalPages = Math.ceil(total / limit);
      const result = {
        next: page * limit < total ? { next: page + 1, limit } : undefined,
        prev: page > 1 ? { prev: page - 1, limit } : undefined,
        totalPages,
        items,
      };
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        { message: 'Something went wrong' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new HttpException(
          `User not found with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        { message: 'Something went wrong' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        throw new HttpException(
          `User not found with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
  
      return updatedUser;
    } catch (error) {
      
  
      if (error instanceof HttpException) {
        throw error;
      }
  
      throw new HttpException(
        { message: 'Something went wrong during user update' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  

  async remove(id: string): Promise<string> {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      if (!user) {
        throw new HttpException(
          `User not found with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return `User with id: ${id} deleted successfully`;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        { message: 'Something went wrong' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchByName(name: string): Promise<User[]> {
    return this.userModel
      .find({ name: { $regex: new RegExp(name, 'i') } })
      .exec();
  }
}
