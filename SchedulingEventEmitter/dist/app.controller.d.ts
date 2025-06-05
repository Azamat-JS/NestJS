import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    createUser(body: CreateUserDto): Promise<void>;
}
