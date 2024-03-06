import { Telegraf } from "telegraf";
import {Application, Router} from '@cfworker/web';
import dotenv from 'dotenv';
import createTelegrafMiddleware from 'cfworker-middleware-telegraf' 

import {} from ''

dotenv.config();
//@ts-expect-error
const token = process.env.NODE_ENV === 'development' ? process.env.BOT_TOKEN : self.BOT_TOKEN

const bot = new Telegraf(token);

bot.hears('hi', (ctx) => {
    ctx.reply('Ну, привет!')
})

if (process.env.NODE_ENV === 'development') {
    bot.launch();
} else {
    const router = new Router();
    // @ts-ignore
    router.post(`/${self.SECRET_PATH}`, createTelegrafMiddleware(bot));
    new Application().use(router.middleware).listen();
}