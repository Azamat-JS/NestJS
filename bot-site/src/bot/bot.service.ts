import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as TelegramBot from "node-telegram-bot-api";
import { generate } from "rxjs";
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

    this.bot.onText(/\/quiz/, async (msg) => {
     const chatId = msg.chat.id
     const questions = generateQuestions()
     let score = 0;
     let index = 0;

     const askQuestion = () => {
      if(index < questions.length){
        this.bot.sendMessage(chatId, questions[index].question);
      }else{
        this.bot.sendMessage(chatId, `Quiz tugadi! Sizning to'gri javoblaringiz ${score}/10 \n quizni yana davom ettirishni xohlasangiz "/quiz" buyrug'ini bosing\n agar qiyinroq savollarni xohlasangiz "/hardquiz" buyrug'ini bosing`);
      }
     };

     this.bot.on('message', (response) => {
      if(index < questions.length && !response.text?.startsWith('/')){
        if(parseInt(response.text as string) === questions[index].answer){
          score++;
        }
        index++;
        askQuestion();
      }
     });
     askQuestion();
    })

    function generateQuestions(){
      const questions:any = [];
      for (let i = 0; i < 10; i++) {
        const num1 = Math.floor(Math.random() * 50);
        const num2 = Math.floor(Math.random() * 10);
        questions.push({question: `${num1} + ${num2} = ?`, answer: num1 + num2})
      }
      return questions
    }

    function hardQuestions(){
      const hardQuestions:any = [];
      for (let i = 0; i < 10; i++) {
        const num1 = Math.floor(Math.random() * 100);
        const num2 = Math.floor(Math.random() * 10);
        hardQuestions.push({question: `${num1} * ${num2} = ?`, answer: num1 * num2})
      }
      return hardQuestions
    }

    this.bot.onText(/\/hardquiz/, (msg) => {
      const chatId = msg.chat.id
      const questions = hardQuestions()
      let score = 0;
      let index = 0;
 
      const askQuestion = () => {
       if(index < questions.length){
         this.bot.sendMessage(chatId, questions[index].question);
       }else{
         this.bot.sendMessage(chatId, `Quiz tugadi! Sizning to'gri javoblaringiz ${score}/10 \n quizni yana davom ettirishni xohlasangiz "/quiz" buyrug'ini bosing\n agar qiyinroq savollarni xohlasangiz "/hardquiz" buyrug'ini bosing`);
       }
      };
 
      this.bot.on('message', (response) => {
       if(index < questions.length && !response.text?.startsWith('/')){
         if(parseInt(response.text as string) === questions[index].answer){
           score++;
         }
         index++;
         askQuestion();
       }
      });
      askQuestion();
    })

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
