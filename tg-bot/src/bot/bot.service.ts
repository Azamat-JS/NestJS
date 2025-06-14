import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import * as TelegramBot from "node-telegram-bot-api";
import { Food, FoodDocument } from "schema/food-schema";

@Injectable()
export class BotService {
  private bot: TelegramBot;
  private readonly ownerId = Number(process.env.OWNER_ID);

  private waitingForFoodName = new Map<number, boolean>();
  private waitingForFoodPrice = new Map<number, boolean>();
  private waitingForFoodCategory = new Map<number, boolean>();
  private waitingForProductDeletion = new Map<number, boolean>();
  private userCart = new Map<number, { name: string; price: number }[]>();

  private foodName: string = "";
  private foodPrice: number = 0;
  private clickToken: string = process.env.CLICK_TOKEN as string;

  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) {
    this.bot = new TelegramBot(process.env.BOT_TOKEN as string, {
      polling: true,
    });

    mongoose
      .connect(process.env.MONGO_URI as string)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("MongoDB connection error:", err));
      
    this.bot.setMyCommands([
      {
        command: "/start",
        description: "Botni ishga tushirish",
      },
      {
        command: "/ichimliklar",
        description: "Ichimlar buyurtma qilish uchun",
      },
      {
        command: "/yeguliklar",
        description: "Yeguliklar buyurtma qilish uchun",
      },
      {
        command: "/shirinliklar",
        description: "Shirinliklar buyurtma qilish uchun",
      },
      {
        command: "/tolov",
        description: "Pul o'tkazish uchun",
      },
      {
        command: "/mahsulot_qoshish",
        description: "Mahsulot qo'shish uchun",
      },
      {
        command: "/mahsulot_ochirish",
        description: "Mahsulot o'chirish uchun",
      },
      {
        command: "/malumotlaringiz",
        description: "Ma'lumot ulashish uchun",
      },
      {
        command: "/mahsulot_rasmlari",
        description: "Mahsulotlar rasmlari va ma'lumotlari",
      },
    ]);

    this.bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;
      const name = msg.from?.first_name;

      this.bot.sendMessage(
        chatId,
        `Assalomu alaykum, ${name}!\nFast-food botiga xush kelibsiz!\n\n` +
          "Yeguliklar tanlash: /yeguliklar\n" +
          "Ichimliklar tanlash: /ichimliklar\n" +
          "Shirinliklar tanlash: /shirinliklar\n" +
          "To'lov qilish: /tolov\n" +
          "Ma'lumot ulashish uchun: /malumotlaringiz\n" +
          "Mahsulotlar ramslarini ko'rish uchun: /mahsulot_rasmlari\n" +
          "Yangi mahsulot qo'shish (faqat adminlar): /mahsulot_qoshish\n" +
          "Mahsulot o'chirish uchun (faqat adminlar): /mahsulot_ochirish\n"
      );
    });

    this.bot.onText(/\/malumotlaringiz/, async (msg) => {
      const chatId = msg.chat.id;  
      this.bot.sendMessage(chatId, "Ma'lumotlar", {
        reply_markup: {
          keyboard: [
            [{ text: "Contact", request_contact:true }, { text: "Location", request_location:true }],
            [{ text: "Photo" }],
          ],
          resize_keyboard: true,
        },
      });
    });

    this.bot.onText(/\/mahsulot_rasmlari/, async (msg) => {
      const chatId = msg.chat.id
      this.bot.sendMessage(chatId, "Rasmlar", {
        reply_markup:{
          keyboard:[
            [{text: "Mahsulotlar_rasmlari"}]
          ],
          resize_keyboard:true
        }
      })
    });

    ///////////////////// payment
    this.bot.onText(/\/tolov/, async (msg) => {
      const chatId = msg.chat.id as number;

      this.bot.sendInvoice(
        chatId,
        "Mahsulot uchun to'lov",
        "Mahsulotlar uchun to'lov qilshingiz mumkin",
        "to'lov",
        this.clickToken,
        "UZS",
        [
          {
            label: "Mahsulot",
            amount: 1200000,
          },
          {
            label: "Ichimlik",
            amount: 1200000,
          },
        ],
        {
          need_phone_number: true,
          need_name: true,
          need_shipping_address: true,
        }
      );
    });

    ///////////////////// add_food
    this.bot.onText(/\/mahsulot_qoshish/, async (msg) => {
      const chatId = msg.chat.id;
      if (msg.from?.id !== this.ownerId) {
        return this.bot.sendMessage(chatId, "❌ Siz fast-food egasi emassiz!");
      }

      this.bot.sendMessage(chatId, "📝 Yangi mahsulot nomini kiriting:");
      this.waitingForFoodName.set(chatId, true);
    });

    this.waitingForFoodName = new Map();
    this.waitingForFoodPrice = new Map();
    this.waitingForFoodCategory = new Map();

    this.bot.on("message", async (msg) => {
      const chatId = msg.chat.id;
      const text = msg.text as string;

      if (this.waitingForFoodName.get(chatId)) {
        this.foodName = text;
        this.waitingForFoodName.delete(chatId);
        this.waitingForFoodPrice.set(chatId, true);
        return this.bot.sendMessage(chatId, "💰 Mahsulot narxini kiriting:");
      }

      if (this.waitingForFoodPrice.get(chatId)) {
        const price = Number(text);
        if (isNaN(price)) {
          return this.bot.sendMessage(chatId, "❌ Iltimos, raqam kiriting!");
        }

        this.foodPrice = price;
        this.waitingForFoodPrice.delete(chatId);
        this.waitingForFoodCategory.set(chatId, true);
        return this.bot.sendMessage(
          chatId,
          "📂 Kategoriya tanlang:\n1️⃣ ichimliklar\n2️⃣ yeguliklar\n3️⃣ shirinliklar",
          {
            reply_markup: {
              keyboard: [
                [
                  { text: "ichimliklar" },
                  { text: "yeguliklar" },
                  { text: "shirinliklar" },
                ],
              ],
              one_time_keyboard: true,
            },
          }
        );
      }

      if (this.waitingForFoodCategory.get(chatId)) {
        if (
          !["ichimliklar", "yeguliklar", "shirinliklar"].includes(
            text.toLowerCase()
          )
        ) {
          return this.bot.sendMessage(
            chatId,
            "❌ Noto‘g‘ri kategoriya! Iltimos, qayta urinib ko‘ring."
          );
        }

        const category = text.toLowerCase();
        this.waitingForFoodCategory.delete(chatId);

        await this.foodModel.create({
          name: this.foodName,
          price: this.foodPrice,
          category: category,
        });

        this.bot.sendMessage(
          chatId,
          `✅ Yangi taom qo'shildi!\n📌 Nomi: ${this.foodName}\n💰 Narxi: ${this.foodPrice} so'm\n📂 Kategoriya: ${category}`
        );
      }
///////// send location
      if(msg.location){
        this.bot.sendLocation(this.ownerId, msg.location.latitude, msg.location.longitude)
      }

      // //send contact
      if(msg.contact){
        this.bot.sendMessage(this.ownerId, msg.contact.phone_number)
      }

      //// send photo
      if(msg.text === "Photo"){
         this.bot.sendPhoto(chatId, "https://static.vecteezy.com/system/resources/thumbnails/021/615/530/small_2x/bot-3d-render-icon-illustration-png.png")
      }

      if(msg.text === "Mahsulotlar_rasmlari"){
          this.bot.sendPhoto(chatId, 
            "https://t4.ftcdn.net/jpg/06/68/94/37/360_F_668943788_5v29s7VjxZtSc6vR2FpvCrHJX2tMnMDO.jpg",
            {
              parse_mode: "HTML",
              caption: "<strong>Pizza</strong>\nnarxi: 12000\ntarkibi: pishloq, pomidor",
              reply_markup: {
                inline_keyboard:[
                  [
                    {text:"Buyurtma berish", callback_data:"food"}
                  ]
                ]
              }
            }
          )
          this.bot.sendPhoto(chatId, 
            "https://pngimg.com/d/burger_sandwich_PNG4135.png",
            {
              parse_mode: "HTML",
              caption: "<strong>Hamburger</strong>\nnarxi: 11000\ntarkibi: mol go'shti, pomidor, gulkaram",
              reply_markup: {
                inline_keyboard:[
                  [
                    {text:"Buyurtma berish", callback_data:"food"}
                  ]
                ]
              }
            }
          )
          this.bot.sendPhoto(chatId, 
            "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA5L3Jhd3BpeGVsb2ZmaWNlMTFfdGhlX2Jlc3Rfc2hvdF9vZl9fY2xhc3NpY19ob3RfZG9nX3R2X2Fkc19zdHlsZV85MjUyMDMzNi1iNGI0LTQyMzMtYjQ0MC0yYTVkM2NlYjlhODkucG5n.png",
            {
              parse_mode: "HTML",
              caption: "<strong>Hot-dog</strong>\nnarxi: 9000\ntarkibi: tomat pastasi, ko'kat, sosiska",
              reply_markup: {
                inline_keyboard:[
                  [
                    {text:"Buyurtma berish", callback_data:"food"}
                  ]
                ]
              }
            }
          )
          this.bot.sendPhoto(chatId, 
            "https://static.vecteezy.com/system/resources/previews/046/544/935/non_2x/french-fries-flying-out-of-paper-bucket-isolated-on-a-transparent-background-png.png",
            {
              parse_mode: "HTML",
              caption: "<strong>Kartoshka fri</strong>\nnarxi: 13000\ntarkibi: kartoshka",
              reply_markup: {
                inline_keyboard:[
                  [
                    {text:"Buyurtma berish",callback_data:"food"}
                  ]
                ]
              }
            }
          )
          this.bot.sendPhoto(chatId, 
            "https://www.pngplay.com/wp-content/uploads/1/Grilled-Sandwich-PNG-HD-Quality.png",
            {
              parse_mode: "HTML",
              caption: "<strong>Sandwich</strong>\nnarxi: 12000\ntarkibi: pishloq, pomidor, ko'kat",
              reply_markup: {
                inline_keyboard:[
                  [
                    {text:"Buyurtma berish", callback_data:"food"}
                  ]
                ]
              }
            }
          )
      }
    });

    this.bot.onText(
      /\/(ichimliklar|yeguliklar|shirinliklar)/,
      async (msg, match) => {
        const chatId = msg.chat.id;

        if (!match || !match[1]) {
          return this.bot.sendMessage(
            chatId,
            "❌ Noto‘g‘ri buyruq! Iltimos, qayta urinib ko‘ring."
          );
        }

        const category = match[1].toLowerCase();

        const foods = await this.foodModel.find({ category });

        if (foods.length === 0) {
          return this.bot.sendMessage(
            chatId,
            "❌ Hozircha bu kategoriyada mahsulot mavjud emas."
          );
        }

        let foodList = "📜 Mavjud mahsulotlar:\n";
        foods.forEach((food: any, index: number) => {
          foodList += `${index + 1}. ${food.name} - ${food.price} so'm\n`;
        });

        this.bot.sendMessage(chatId, foodList);
      }
    );

    //// product details
    this.bot.onText(/\/details/, async (msg) => {});

    ////////// Delete product
    this.bot.onText(/\/mahsulot_ochirish/, (msg) =>
      this.handleDeleteProductCommand(msg)
    );

    // Listen for product name input
    this.bot.on("message", (msg) => this.handleProductDeletion(msg));
  }

  private async handleDeleteProductCommand(msg: TelegramBot.Message) {
    const chatId = msg.chat.id;

    // Only allow the owner to delete products
    if (msg.from?.id !== this.ownerId) {
      return this.bot.sendMessage(
        chatId,
        "❌ Siz mahsulot o‘chirish huquqiga ega emassiz."
      );
    }

    this.waitingForProductDeletion.set(chatId, true);
    this.bot.sendMessage(
      chatId,
      "📝 O‘chirmoqchi bo‘lgan mahsulot nomini kiriting:"
    );
  }

  private async handleProductDeletion(msg: TelegramBot.Message) {
    const chatId = msg.chat.id;
    const productName = msg.text?.trim();

    if (this.waitingForProductDeletion.has(chatId)) {
      this.waitingForProductDeletion.delete(chatId);

      // Check if product exists
      const product = await this.foodModel.findOne({ name: productName });

      if (!product) {
        return this.bot.sendMessage(chatId, "❌ Bunday mahsulot topilmadi.");
      }

      // Delete the product
      await this.foodModel.deleteOne({ name: productName });

      this.bot.sendMessage(chatId, `✅ ${productName} mahsuloti o‘chirildi.`);
    }
  }
}
