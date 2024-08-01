import { useState } from "react"
import { type AFC, CodeBlock } from "./toolUI"
import { type CoreMessage, generateText } from "ai"
import { llama } from "@/model/init"
import { Input } from "../input"

const AI: AFC<"AI"> = ({ data }) => {
    const [conversation, setConv] = useState<CoreMessage[]>([
        {
            content: data.response,
            role: "assistant"
        }
    ])

    const nextConv = async (string: string) => {
        const res = await generateText({
            model: llama,
            system: data.system,
            messages: [...conversation, {
                content: string,
                role: "user"
            }]
        })

        setConv([...conversation, {
            content: string,
            role: "user"
        }, {
            content: res.text,
            role: "assistant"
        }])
    }
    return (
        <div className="flex flex-col gap-2">
            {conversation.map((c, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <CodeBlock key={i} varient={c.role === "user" ? "secondary" : "default"}>
                    {typeof c.content === "string" ? c.content : JSON.stringify(c.content, null, 2)}
                </CodeBlock>
            ))}
            <Input placeholder="Continue conversation" onKeyDown={(e) => {
                if (e.key === "Enter") {
                    nextConv(e.currentTarget.value)
                    e.currentTarget.value = ""
                }
            }} />
        </div>
    )
}

export const CustomUI = {
    AI
}
