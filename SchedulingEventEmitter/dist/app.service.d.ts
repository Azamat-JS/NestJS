import { CreateUserDto } from "./dto/create-user.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UserCreatedEvent } from "./events/user-created.event";
import { SchedulerRegistry } from "@nestjs/schedule";
export declare class AppService {
    private readonly eventEmitter;
    private schedulerRegistry;
    constructor(eventEmitter: EventEmitter2, schedulerRegistry: SchedulerRegistry);
    private readonly logger;
    getHello(): string;
    createUser(body: CreateUserDto): Promise<void>;
    private establishWSConnection;
    welcomeNewUser(payload: UserCreatedEvent): void;
    sendRequestToSomeUrl(): Promise<void>;
    intervalForever(): Promise<void>;
}
