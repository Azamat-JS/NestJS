import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import * as bcrypt from 'bcrypt'
import {JwtService} from '@nestjs/jwt'
import * as nodemailer from 'nodemailer'
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService:JwtService,
    private configService: ConfigService
  ) {}

  async sendVerificationEmail(email: string, code: string) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verification code",
      html: `<p>Your verification code:</p><br><h1>${code}</h1><br><p>Enter this code to verify your account</p>`,
    };
  
    await transporter.sendMail(mailOptions);
  }
  
  async registerUser(userData: Partial<User>): Promise<User> {
    if (!userData.password) {
      throw new Error("Password is required");
    }
    
    const salt = bcrypt.genSaltSync(10);
    userData.password = bcrypt.hashSync(userData.password, salt);
    
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async login(email:string, password:string):Promise<{token: string}>{
    const user = await this.userRepository.findOne({where: {email}})

    if(!user){
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
    }

    const payload = {username: user.username, email:user.email, role:user.role}
    const token = this.jwtService.sign(payload, {secret: process.env.JWT_SECRET,
      expiresIn: '1d'});

    return {token};
  }

  // Forgot password

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Generate a reset token
    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // Token valid for 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await this.userRepository.save(user);

    // Send email with the reset link
    await this.sendResetEmail(user.email, resetToken);

    return { message: 'Password reset link sent to your email' };
  }

  async sendResetEmail(email: string, resetToken: string) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'), // Read from .env
        pass: this.configService.get<string>('EMAIL_PASS'), // Read from .env
      },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `Click the link to reset your password: ${resetLink}`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });
  }

  //////  Reset password

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { resetToken: token } });

    if (!user || !user.resetTokenExpiry || new Date() > user.resetTokenExpiry) {
      throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
    }

    // Hash the new password and save it
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(newPassword, salt);

    // Clear reset token
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await this.userRepository.save(user);

    return { message: 'Password reset successful' };
  }
  
  
  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }
}
