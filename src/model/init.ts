//@ts-ignore
import { createOpenAI } from "@ai-sdk/openai";
import { chromeai } from "chrome-ai";
// import Groq from "groq-sdk";

// export const groqVoice = new Groq({
//     apiKey: import.meta.env.GROQ_API_KEY,
// });

export const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: "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",
});

export const ollama = chromeai();

export const llama = groq("llama3-8b-8192");
