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
exports.AppUpdate = void 0;
const telegraf_1 = require("telegraf");
const app_service_1 = require("./app.service");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const app_buttons_1 = require("./app.buttons");
const app_utils_1 = require("./app.utils");
let AppUpdate = class AppUpdate {
    bot;
    appService;
    constructor(bot, appService) {
        this.bot = bot;
        this.appService = appService;
    }
    async startCommand(ctx) {
        await ctx.reply("Assalam alaykum 👋");
        await ctx.reply("What task do you want to add?", (0, app_buttons_1.taskButtons)());
    }
    async showButtons(ctx) {
        await ctx.reply("Select your button", (0, app_buttons_1.replyKeyboard)());
    }
    async handleTodo(ctx) {
        await ctx.reply(`Here is your to-do list...`);
    }
    async handleEdit(ctx) {
        await ctx.reply("Which task would you like to edit?");
    }
    async handleDelete(ctx) {
        await ctx.reply("Which task should be deleted?");
    }
    async handleUsers(ctx) {
        await ctx.replyWithPhoto({ source: "./img/code.png" });
    }
    async handleTasks(ctx) {
        await ctx.reply("Are you sure?", telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback("Yes ✅", "confirm_yes"),
            telegraf_1.Markup.button.callback("No ❌", "confirm_no"),
        ]));
    }
    async handleYes(ctx) {
        await ctx.reply("You are fine go ahead");
    }
    async handleNo(ctx) {
        await ctx.reply("You choose to close your bot");
    }
    async getTasks(ctx) {
        await ctx.replyWithHTML(`<strong>New task</strong>\nThis is your task`);
    }
    async getProducts(ctx) {
        await ctx.replyWithHTML(`<b>New price</b> - $75\n <b>Old price</b> - <del>$100</del>`);
    }
    async getUsers(ctx) {
        await ctx.replyWithPhoto({ source: "./img/code.png" });
    }
    async handleGetTasks(ctx) {
        const todos = await this.appService.getAll();
        ctx.reply((0, app_utils_1.showList)(todos));
    }
    async editTask(ctx) {
        ctx.session.type = "edit";
        await ctx.deleteMessage();
        await ctx.replyWithHTML("Write ID and rename the task: \n\n" +
            `In this format:<i> 1 | new name</i>`);
    }
    async doneTask(ctx) {
        ctx.session.type = "done";
        await ctx.deleteMessage();
        await ctx.reply("Write ID of the task: ");
    }
    async createTask(ctx) {
        ctx.session.type = "create";
        await ctx.reply("Write new task name");
    }
    async removeTask(ctx) {
        ctx.session.type = "remove";
        await ctx.reply("Write ID of the task: ");
    }
    async getMessage(message, ctx) {
        if (!ctx.session.type)
            return;
        if (ctx.session.type === "create") {
            const todos = await this.appService.createTask(message);
            await ctx.reply((0, app_utils_1.showList)(todos));
        }
        if (ctx.session.type === "done") {
            const todos = await this.appService.doneTask(Number(message));
            if (!todos) {
                await ctx.deleteMessage();
                await ctx.reply(`Task with id: ${message} not found`);
                return;
            }
            await ctx.reply((0, app_utils_1.showList)(todos));
        }
        if (ctx.session.type === "edit") {
            const [taskId, newName] = message.split(" | ");
            const todos = await this.appService.editTask(Number(taskId), newName);
            if (!todos) {
                await ctx.deleteMessage();
                await ctx.reply(`Task with id: ${taskId} not found`);
                return;
            }
            await ctx.reply((0, app_utils_1.showList)(todos));
        }
        if (ctx.session.type === "remove") {
            const todos = await this.appService.deleteTask(Number(message));
            if (!todos) {
                await ctx.deleteMessage();
                await ctx.reply(`Task with id: ${message} not found`);
                return;
            }
            await ctx.reply((0, app_utils_1.showList)(todos));
        }
    }
};
exports.AppUpdate = AppUpdate;
__decorate([
    (0, nestjs_telegraf_1.Start)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "startCommand", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("Todo"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "showButtons", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("Todo list"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "handleTodo", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("Edit task"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "handleEdit", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("Delete task"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "handleDelete", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("Get tasks"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "handleUsers", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("/tasks"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "handleTasks", null);
__decorate([
    (0, nestjs_telegraf_1.Action)("confirm_yes"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "handleYes", null);
__decorate([
    (0, nestjs_telegraf_1.Action)("confirm_no"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "handleNo", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("list"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "getTasks", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("products"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "getProducts", null);
__decorate([
    (0, nestjs_telegraf_1.Action)("users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "getUsers", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("📜 All tasks"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "handleGetTasks", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("✏️ Edit task"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "editTask", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("✅ Completed tasks"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "doneTask", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("➕ Create task"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "createTask", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("🗑️ Remove task"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "removeTask", null);
__decorate([
    (0, nestjs_telegraf_1.On)("text"),
    __param(0, (0, nestjs_telegraf_1.Message)("text")),
    __param(1, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppUpdate.prototype, "getMessage", null);
exports.AppUpdate = AppUpdate = __decorate([
    (0, nestjs_telegraf_1.Update)(),
    __param(0, (0, nestjs_telegraf_1.InjectBot)()),
    __metadata("design:paramtypes", [telegraf_1.Telegraf,
        app_service_1.AppService])
], AppUpdate);
//# sourceMappingURL=app.controller.js.map