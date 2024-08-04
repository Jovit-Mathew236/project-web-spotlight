import { useAIControl } from "@/lib/state";
import { useEffect } from "react";
import { CornerDownLeft } from "lucide-react";
import { CommandEmpty } from "../ui/command";
import { useCommandState } from "cmdk";

//import { Terminal } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { CustomUI, CustomUIIcons } from "./custom";


const CommandEmptyState = () => {
    const { setEmpty, searchResults } = useAIControl()
    const search = useCommandState((state) => state.search)

    useEffect(() => {
        setEmpty(true)

        return () => setEmpty(false)
    }, [])

    return (
        <>
            {!searchResults.length && <div className="flex mx-auto">Search AI for "{search}" <CornerDownLeft className="ms-1 border p-1 bg-card-foreground/5" size={20} /></div>}
            <div className="flex flex-col gap-1 w-full">
                {searchResults.map(s => {
                    const UI = s.toolName in CustomUI ? CustomUI[s.toolName as keyof typeof CustomUI] : null
                    const Icon = s.toolName in CustomUIIcons ? CustomUIIcons[s.toolName as keyof typeof CustomUI] : null
                    return (
                        <Alert className="p-2 w-full" key={s.toolCallId}>
                            <AlertTitle className="flex gap-2">
                                {Icon && <Icon className="h-4 w-4" />}
                                {s.toolName}</AlertTitle>
                            <AlertDescription>
                                {/* @ts-ignore */}
                                {UI ? <UI data={s.result} /> :
                                    <pre className="mt-2 w-full rounded-md bg-card-foreground p-4">
                                        <code className="text-card text-wrap">
                                            {typeof s.result === "string" ? s.result : JSON.stringify(s.result, null, 2)}
                                        </code>
                                    </pre>}
                            </AlertDescription>
                        </Alert>
                    )
                }
                )}
            </div>
        </>
    )
}

export const CommandEmptyContainer = () => (
    <CommandEmpty className="flex flex-col p-6 text-sm gap-6">
        <CommandEmptyState />
    </CommandEmpty>
)