import { cn } from "@/lib/utils";
import type { getTools } from "@/model/tools";
import type { FC, ReactNode } from "react";

type ToolReturn = Awaited<ReturnType<ReturnType<typeof getTools>>>["tools"]

export type AFC<K extends keyof ToolReturn> = FC<{
    data: Awaited<ReturnType<ToolReturn[K]["execute"]>>
}>

export const CodeBlock: FC<{ children: ReactNode, varient?: "default" | "secondary" }> = 
({ children, varient = "default" }) => <pre className={cn("mt-2 w-full rounded-md p-4", varient === "default" ? "bg-gradient-custom" : "bg-card-foreground")}>
    <code className="text-card text-wrap">
        {children}
    </code>
</pre>