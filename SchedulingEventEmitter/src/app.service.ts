import { Injectable, Logger } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { UserCreatedEvent } from "./events/user-created.event";
import {

  Interval,
  SchedulerRegistry,
} from "@nestjs/schedule";
import axios from "axios";

@Injectable()
export class AppService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private schedulerRegistry: SchedulerRegistry
  ) {}

  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    return "Hello World!";
  }


  async createAuth(data: CreateUserDto){
    this.logger.log('creating new user...', data)
    const userId = '222'
    this.eventEmitter.emit('user.creating', data)
  }


  @Interval(1000)
  async taskWriting(){
    this.logger.log('tasks are creating')
  }

  // @OnEvent('user.creating')
  // handleUserCreating(payload: CreateUserDto){
  //   console.log(`function received the data ${payload.email} ${payload.password}`)
  // }


  // async createUser(body: CreateUserDto) {
  //   this.logger.log("Creating user...", body);
  //   const userId = "1234";
  //   this.eventEmitter.emit(
  //     "user.created",
  //     new UserCreatedEvent(userId, body.email)
  //   );

  //   const establishWSTimeout = setTimeout(
  //     () => this.establishWSConnection(userId),
  //     5000
  //   );

  //   this.schedulerRegistry.addTimeout(
  //     `${userId}_establish_ws`,
  //     establishWSTimeout
  //   );
  // }

  // private establishWSConnection(userId: string) {
  //   this.logger.log("Establishing ws connection with user", userId);
  // }

  // @OnEvent("user.created")
  // welcomeNewUser(payload: UserCreatedEvent) {
  //   this.logger.log("Welcoming new user...", payload.email);
  // }

  // @OnEvent("user.created", { async: true })
  // async sendWelcomeGift(payload: UserCreatedEvent) {
  //   this.logger.log("Sending welcome gift...", payload.email);
  //   await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
  //   this.logger.log("Welcome gift sent", payload.email);
  // }

  // @Cron(CronExpression.EVERY_10_SECONDS, { name: "delete expired users" })
  // deleteExpiredUsers() {
  //   this.logger.log("Deleting expired users");
  // }

  @Interval(1000)
  async sendRequestToSomeUrl() {
    try {
      await this.intervalForever();
      console.log()
    } catch (error) {
      console.error("Error with interval");
    }
  }

  async intervalForever() {
    try {
      const response = await axios.get("http://localhost:4000/users", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log(response.data);
    } catch (error) {}
  }
}
