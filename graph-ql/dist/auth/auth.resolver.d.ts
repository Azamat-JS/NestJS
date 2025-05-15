import { AuthService } from './auth.service';
import { RegisterInput } from './dto/create-auth.input';
import { RegisterResponse } from './entities/res.auth';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    sayHello(): string;
    register(createUserDto: RegisterInput): Promise<RegisterResponse>;
    login(email: string, password: string): Promise<string>;
    forgotPassword(email: string): Promise<string>;
    resetPassword(token: string, newPassword: string): Promise<string>;
}
