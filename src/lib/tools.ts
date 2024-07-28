import { generateText, tool, LanguageModel } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { chromeai } from 'chrome-ai';
import { z } from "zod";

export const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
});

export const ollama = chromeai()

export const llama = groq("llama3-8b-8192");

export const getTools = (model: LanguageModel) => {

    const runTool = async (prompt: string) => {
        const response = await generateText({
            model: model,
            prompt,
            system:
                "You are a personal assistant to developers who like to help with any requirements",
            tools: {
                search: tool({
                    description:
                        "Searching any topic or solve any doubt on specified a platform",
                    parameters: z.object({
                        topic: z.string().describe("The topic or doubt to search for"),
                        platform: z.enum(["google", "youtube", "perplexity", "reddit", "chatgpt"]).default("google")
                    }),
                    execute: async ({ topic, platform }) => `Searching for ${topic} on ${platform}`,
                }),

                createNewTabs: tool({
                    description: "Create or open multiple tabs of websites",
                    parameters: z.object({
                        websites: z.array(
                            z.string()
                                .describe("The name of website (dont specify domain suffixes)")
                        ).min(1).max(4),
                        incognito: z.boolean().optional().default(false).describe("Open tabs in incognito or private mode")
                    }),
                    execute: async ({ websites, incognito }) => `Creating new ${websites.length}x ${incognito ? "private" : ""} tabs ${websites.join(", ")}`,
                }),

                openTerminal: tool({
                    description: "Open a terminal or cmd",
                    parameters: z.object({}),
                    execute: async () => "Opening terminal"
                }),

                showSection: tool({
                    description: "Open any section",
                    parameters: z.object({
                        section: z.enum(["downloads", "settings", "history", "bookmarks", "extensions", "home"]).default("home")
                    }),
                    execute: async ({ section }) => `Opening ${section}`
                }),

                clearData: tool({
                    description: "Clear any data, or reset any settings",
                    parameters: z.object({
                        section: z.enum(["all", "tabs", "settings", "history", "", "extensions", "home"]).default("home")
                    }),
                    execute: async ({ section }) => `Opening ${section}`
                }),

                openFile: tool({
                    description: "Search any files on computer",
                    parameters: z.object({
                        folderPath: z.string().optional().describe("The path to search for files"),
                        fileName: z.string().optional().describe("The name of file to search")
                    }),
                    execute: async ({ fileName, folderPath }) => {
                        //ijidf

                        // throw new Error("File not found")
                        // jjdfn
                        return `Opening ${fileName ?? "a file"} on path: ${folderPath ?? "unknown"}`
                    }
                }),

            }
        });

        return response;
    };

    return runTool
}
// const res = await runTool("open file my-pdf.pdf from workspace folder");
// console.log(res.toolResults);
