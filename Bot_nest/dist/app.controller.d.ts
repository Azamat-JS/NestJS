import { Telegraf } from "telegraf";
import { AppService } from "./app.service";
import { Context } from "./context.interface";
export declare class AppUpdate {
    private readonly bot;
    private readonly appService;
    constructor(bot: Telegraf<Context>, appService: AppService);
    startCommand(ctx: Context): Promise<void>;
    showButtons(ctx: Context): Promise<void>;
    handleTodo(ctx: Context): Promise<void>;
    handleEdit(ctx: Context): Promise<void>;
    handleDelete(ctx: Context): Promise<void>;
    handleUsers(ctx: Context): Promise<void>;
    handleTasks(ctx: Context): Promise<void>;
    handleAll(ctx: Context): Promise<void>;
    handleYes(ctx: Context): Promise<void>;
    handleNo(ctx: Context): Promise<void>;
    getTasks(ctx: Context): Promise<void>;
    getProducts(ctx: Context): Promise<void>;
    getUsers(ctx: Context): Promise<void>;
    handleGetTasks(ctx: Context): Promise<void>;
    editTask(ctx: Context): Promise<void>;
    doneTask(ctx: Context): Promise<void>;
    removeTask(ctx: Context): Promise<void>;
    getMessage(message: string, ctx: Context): Promise<void>;
}
