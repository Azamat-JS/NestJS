import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private configService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, configService: ConfigService);
    sendVerificationEmail(email: string, code: string): Promise<void>;
    registerUser(userData: Partial<User>): Promise<User>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    sendResetEmail(email: string, resetToken: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    findOneByUsername(username: string): Promise<User | null>;
}
