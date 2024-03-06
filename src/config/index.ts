import dotenv from 'dotenv';
dotenv.config();

export const config = {
    openAIApiKey: process.env.OPENAI_API_KEY,
    botToken: process.env.BOT_TOKEN,
    
}
