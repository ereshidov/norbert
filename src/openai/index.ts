import { ChatOpenAI } from "@langchain/openai";
import {config} from '../config'
export const chatModel = new ChatOpenAI({
    modelName: 'gpt-4-turbo-preview',
    openAIApiKey: config.openAIApiKey, 
    temperature: 0.9
})
