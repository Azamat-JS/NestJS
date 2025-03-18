import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as TelegramBot from "node-telegram-bot-api";
import { Student, StudentDocument } from "src/schema/bot-schema";

@Injectable()
export class BotService {
  private bot: TelegramBot;
  private readonly ownerId = Number(process.env.OWNER_ID);
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>
  ) {
    this.bot = new TelegramBot(process.env.BOT_TOKEN as string, {
      polling: true,
    });
    this.bot.onText(/\/start/, async (msg) => {
      const studentId = msg.chat.id as number;
      const name = msg.from?.first_name || "user";

      if (studentId === this.ownerId) {
        this.bot.sendMessage(
          this.ownerId,
          "You are already registered as an owner"
        );
      } else {
        const student = await this.studentModel.findOne({ chatId: studentId });

        if (!student) {
          await this.studentModel.create({ chatId: studentId, name });
          this.bot.sendMessage(
            this.ownerId,
            `Yangi o'quvchi ro'yhatdan o'tdi ismi: ${msg.from?.first_name} familiyasi: ${msg.from?.last_name}`
          );
          this.bot.sendMessage(
            studentId,
            `Assalam alaykum ${msg.from?.first_name} ${msg.from?.last_name}, \n siz botdan foydalanishingiz mumkin!`
          );
        } else {
          this.bot.sendMessage(
            studentId,
            "Sizdan botdan foydalanishingiz mumkin"
          );
        }
      }
    });

    this.bot.on("message", async (msg) => {
      const chatId = msg.chat.id;
      const studentId = parseInt(
        msg.reply_to_message?.text?.split(":")[0] as string
      );

      if (chatId !== this.ownerId && msg.text !== "/start") {
      return this.bot.sendMessage(
          this.ownerId,
          `${msg.from?.first_name}dan xabar:\n ${msg.text}`
        );
      }
      const student = await this.studentModel.findOne({chatId:chatId})
      if(!student && chatId !== this.ownerId){
       return this.bot.sendMessage(chatId, `Hurmatli ${msg.from?.first_name}, \n /start buyrug'ini berib qaytadan urinib ko'ring`)
      }else{
        this.bot.sendMessage(studentId, msg.text as string)
      }
    });
  }
}
