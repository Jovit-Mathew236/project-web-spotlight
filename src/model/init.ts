import { createOpenAI } from "@ai-sdk/openai";
import { chromeai, polyfillChromeAI,  } from "chrome-ai";
import Groq from "groq-sdk";

// export const groqVoice = new Groq({
//     apiKey: import.meta.env.GROQ_API_KEY,
// });

export const groq = createOpenAI({
    baseURL: "http://localhost:11434",
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
});

export const local = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
});

export const ollama = local("gpt-3.5-turbo")  // chromeai()

export const llama = groq("llama3-8b-8192");