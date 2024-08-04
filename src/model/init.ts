//@ts-ignore
import { createOpenAI } from "@ai-sdk/openai";
import { chromeai } from "chrome-ai";
// import Groq from "groq-sdk";

// export const groqVoice = new Groq({
//     apiKey: import.meta.env.GROQ_API_KEY,
// });

export const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
});

export const ollama = chromeai()

export const llama = groq("llama3-8b-8192");