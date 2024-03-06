import { Telegraf } from "telegraf";
import { Application, Router } from "@cfworker/web";
import dotenv from "dotenv";
import createTelegrafMiddleware from "cfworker-middleware-telegraf";

import { chatModel } from "./openai";

dotenv.config();
const token =
  process.env.NODE_ENV === "development"
    ? process.env.BOT_TOKEN
    : //@ts-expect-error
      self.BOT_TOKEN;

const bot = new Telegraf(token);

bot.on("message", async (ctx) => {
  const message = ctx.text;

  if (!message) {
    ctx.reply("Message is empty");
    return;
  }

  try {
    const response = await chatModel.invoke(message);
    if (typeof response.content === "string") {
      ctx.reply(response.content);
    } else {
      ctx.reply(
        "Response content is not a string, for now i can not show it to you"
      );
    }
  } catch (e) {
    console.log(e);
    ctx.reply("Something went wrong while processing request");
  }
});

if (process.env.NODE_ENV === "development") {
  bot.launch();
} else {
  const router = new Router();
  // @ts-ignore
  router.post(`/${self.SECRET_PATH}`, createTelegrafMiddleware(bot));
  new Application().use(router.middleware).listen();
}
