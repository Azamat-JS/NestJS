import { CreateUserDto } from "./dto/create-user.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { SchedulerRegistry } from "@nestjs/schedule";
export declare class AppService {
    private readonly eventEmitter;
    private schedulerRegistry;
    constructor(eventEmitter: EventEmitter2, schedulerRegistry: SchedulerRegistry);
    private readonly logger;
    getHello(): string;
    createAuth(data: CreateUserDto): Promise<void>;
    taskWriting(): Promise<void>;
    sendRequestToSomeUrl(): Promise<void>;
    intervalForever(): Promise<void>;
}
