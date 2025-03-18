"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const TelegramBot = require("node-telegram-bot-api");
const bot_schema_1 = require("../schema/bot-schema");
let BotService = class BotService {
    studentModel;
    bot;
    ownerId = Number(process.env.OWNER_ID);
    constructor(studentModel) {
        this.studentModel = studentModel;
        this.bot = new TelegramBot(process.env.BOT_TOKEN, {
            polling: true,
        });
        this.bot.onText(/\/start/, async (msg) => {
            const studentId = msg.chat.id;
            const name = msg.from?.first_name || "user";
            if (studentId === this.ownerId) {
                this.bot.sendMessage(this.ownerId, "You are already registered as an owner");
            }
            else {
                const student = await this.studentModel.findOne({ chatId: studentId });
                if (!student) {
                    await this.studentModel.create({ chatId: studentId, name });
                    this.bot.sendMessage(this.ownerId, `Yangi o'quvchi ro'yhatdan o'tdi ismi: ${msg.from?.first_name} familiyasi: ${msg.from?.last_name}`);
                    this.bot.sendMessage(studentId, `Assalam alaykum ${msg.from?.first_name} ${msg.from?.last_name}, \n siz botdan foydalanishingiz mumkin!`);
                }
                else {
                    this.bot.sendMessage(studentId, "Sizdan botdan foydalanishingiz mumkin");
                }
            }
        });
        this.bot.onText(/\/quiz/, async (msg) => {
            const chatId = msg.chat.id;
            const questions = generateQuestions();
            let score = 0;
            let index = 0;
            const askQuestion = () => {
                if (index < questions.length) {
                    this.bot.sendMessage(chatId, questions[index].question);
                }
                else {
                    this.bot.sendMessage(chatId, `Quiz tugadi! Sizning to'gri javoblaringiz ${score}/10 \n quizni yana davom ettirishni xohlasangiz "/quiz" buyrug'ini bosing\n agar qiyinroq savollarni xohlasangiz "/hardquiz" buyrug'ini bosing`);
                }
            };
            this.bot.on('message', (response) => {
                if (index < questions.length && !response.text?.startsWith('/')) {
                    if (parseInt(response.text) === questions[index].answer) {
                        score++;
                    }
                    index++;
                    askQuestion();
                }
            });
            askQuestion();
        });
        function generateQuestions() {
            const questions = [];
            for (let i = 0; i < 10; i++) {
                const num1 = Math.floor(Math.random() * 50);
                const num2 = Math.floor(Math.random() * 10);
                questions.push({ question: `${num1} + ${num2} = ?`, answer: num1 + num2 });
            }
            return questions;
        }
        function hardQuestions() {
            const hardQuestions = [];
            for (let i = 0; i < 10; i++) {
                const num1 = Math.floor(Math.random() * 100);
                const num2 = Math.floor(Math.random() * 10);
                hardQuestions.push({ question: `${num1} * ${num2} = ?`, answer: num1 * num2 });
            }
            return hardQuestions;
        }
        this.bot.onText(/\/hardquiz/, (msg) => {
            const chatId = msg.chat.id;
            const questions = hardQuestions();
            let score = 0;
            let index = 0;
            const askQuestion = () => {
                if (index < questions.length) {
                    this.bot.sendMessage(chatId, questions[index].question);
                }
                else {
                    this.bot.sendMessage(chatId, `Quiz tugadi! Sizning to'gri javoblaringiz ${score}/10 \n quizni yana davom ettirishni xohlasangiz "/quiz" buyrug'ini bosing\n agar qiyinroq savollarni xohlasangiz "/hardquiz" buyrug'ini bosing`);
                }
            };
            this.bot.on('message', (response) => {
                if (index < questions.length && !response.text?.startsWith('/')) {
                    if (parseInt(response.text) === questions[index].answer) {
                        score++;
                    }
                    index++;
                    askQuestion();
                }
            });
            askQuestion();
        });
        this.bot.on("message", async (msg) => {
            const chatId = msg.chat.id;
            const studentId = parseInt(msg.reply_to_message?.text?.split(":")[0]);
            if (chatId !== this.ownerId && msg.text !== "/start") {
                return this.bot.sendMessage(this.ownerId, `${msg.from?.first_name}dan xabar:\n ${msg.text}`);
            }
            const student = await this.studentModel.findOne({ chatId: chatId });
            if (!student && chatId !== this.ownerId) {
                return this.bot.sendMessage(chatId, `Hurmatli ${msg.from?.first_name}, \n /start buyrug'ini berib qaytadan urinib ko'ring`);
            }
            else {
                this.bot.sendMessage(studentId, msg.text);
            }
        });
    }
};
exports.BotService = BotService;
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bot_schema_1.Student.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BotService);
//# sourceMappingURL=bot.service.js.map