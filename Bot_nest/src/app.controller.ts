import { Markup, Telegraf } from "telegraf";
import { AppService } from "./app.service";
import {
  Action,
  Ctx,
  Hears,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { actionButtons, replyKeyboard, taskButtons } from "./app.buttons";
import { Context } from "./context.interface";
import { showList } from "./app.utils";

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply("Assalam alaykum 👋");
    await ctx.reply("What task do you want to add?", taskButtons());
  }

  @Hears("Todo")
  async showButtons(ctx: Context) {
    await ctx.reply("Select your button", replyKeyboard());
  }

  @Hears("Todo list")
  async handleTodo(ctx: Context) {
    await ctx.reply(`Here is your to-do list...`);
  }

  @Hears("Edit task")
  async handleEdit(ctx: Context) {
    await ctx.reply("Which task would you like to edit?");
  }

  @Hears("Delete task")
  async handleDelete(ctx: Context) {
    await ctx.reply("Which task should be deleted?");
  }

  @Hears("Get tasks")
  async handleUsers(ctx: Context) {
    await ctx.replyWithPhoto({ source: "./img/code.png" });
  }

  @Hears("/tasks")
  async handleTasks(ctx: Context) {
    await ctx.reply(
      "Are you sure?",
      Markup.inlineKeyboard([
        Markup.button.callback("Yes ✅", "confirm_yes"),
        Markup.button.callback("No ❌", "confirm_no"),
      ])
    );
  }

  @Action("confirm_yes")
  async handleYes(ctx: Context) {
    await ctx.reply("You are fine go ahead");
  }

  @Action("confirm_no")
  async handleNo(ctx: Context) {
    await ctx.reply("You choose to close your bot");
  }

  @Hears("list")
  async getTasks(ctx: Context) {
    await ctx.replyWithHTML(`<strong>New task</strong>\nThis is your task`);
  }

  @Hears("products")
  async getProducts(ctx: Context) {
    await ctx.replyWithHTML(
      `<b>New price</b> - $75\n <b>Old price</b> - <del>$100</del>`
    );
  }

  @Action("users")
  async getUsers(ctx: Context) {
    await ctx.replyWithPhoto({ source: "./img/code.png" });
  }

  @Hears("📜 All tasks")
  async handleGetTasks(ctx: Context) {
    const todos = await this.appService.getAll();
    ctx.reply(showList(todos));
  }

  @Hears("✏️ Edit task")
  async editTask(ctx: Context) {
    ctx.session.type = "edit";
    await ctx.deleteMessage();
    await ctx.replyWithHTML(
      "Write ID and rename the task: \n\n" +
        `In this format:<i> 1 | new name</i>`
    );
  }

  @Hears("✅ Completed tasks")
  async doneTask(ctx: Context) {
    ctx.session.type = "done";
    await ctx.deleteMessage();
    await ctx.reply("Write ID of the task: ");
  }

  @Hears("➕ Create task")
  async createTask(ctx: Context) {
    ctx.session.type = "create";
    await ctx.reply("Write new task name");
  }

  @Hears("🗑️ Remove task")
  async removeTask(ctx: Context) {
    ctx.session.type = "remove";
    await ctx.reply("Write ID of the task: ");
  }

  @On("text")
  async getMessage(@Message("text") message: string, @Ctx() ctx: Context) {
    if (!ctx.session.type) return;

    if (ctx.session.type === "create") {
      const todos = await this.appService.createTask(message);
      await ctx.reply(showList(todos));
    }

    if (ctx.session.type === "done") {
      const todos = await this.appService.doneTask(Number(message));

      if (!todos) {
        await ctx.deleteMessage();
        await ctx.reply(`Task with id: ${message} not found`);
        return;
      }
      await ctx.reply(showList(todos));
    }

    if (ctx.session.type === "edit") {
      const [taskId, newName] = message.split(" | ");
      const todos = await this.appService.editTask(Number(taskId), newName);

      if (!todos) {
        await ctx.deleteMessage();
        await ctx.reply(`Task with id: ${taskId} not found`);
        return;
      }
      await ctx.reply(showList(todos));
    }

    if (ctx.session.type === "remove") {
      const todos = await this.appService.deleteTask(Number(message));

      if (!todos) {
        await ctx.deleteMessage();
        await ctx.reply(`Task with id: ${message} not found`);
        return;
      }
      await ctx.reply(showList(todos));
    }
  }
}
