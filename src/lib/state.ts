import { llama } from '@/model/init'
import { getTools } from '@/model/tools'
import type { ToolResultPart } from 'ai'
import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

type Web = {
    title: string
    url: string
}

type Group = Web[]

type State = {
    groups: Group[]
    getGroups: () => Group[]

    history: Web[]

    downloads: string[]
    getDownloads: () => string[]
}

export const useUserState = create<State>()((set, get) => ({
    downloads: [],
    history: [
        { title: "google", url: "https://google.com" },
        { title: "github", url: "https://github.com" },
        { title: "groq", url: "https://groq.com" },
    ],
    groups: [], // call api here
    getDownloads: () => {
        const d = get().downloads

        if (d.length === 0) {
            const newDownloads: string[] = [] // call api

            set(e => ({ ...e, downloads: newDownloads }))

            return newDownloads
        }

        return d
    },
    getGroups: () => get().groups
}))

type AI = {
    isListerning: boolean
    isSpeaking: boolean
    isError: Error | undefined
    isProcessing: boolean,

    // setControl: (control: Partial<AI["control"]>) => void
    isPlaying: boolean
    setIsPlaying: (input: AI["isPlaying"]) => void

    empty: boolean
    setEmpty: (empty: AI["empty"]) => void

    searchResults: ToolResultPart[]
    searchAI: (string: string) => Promise<void>
}

export const useAIControl = create<AI>()((set, get) => ({
    isListerning: true,
    isSpeaking: false,
    isError: undefined,
    isProcessing: false,
    // setControl: (control) => set(e => ({ ...control })),

    isPlaying: false,
    setIsPlaying: (isPlaying) => set(e => ({ isPlaying })),

    empty: false,
    setEmpty: (empty) => set(e => ({ empty })),

    searchResults: [],
    searchAI: async (text) => {
        set(e => ({ isProcessing: true }))

        const { history } = useUserState.getState()

        const runTool = getTools(llama, window, history.map(e => e.url))

        runTool(text).then(({ response: res }) => {

            console.log(res.toolResults)

            set(e => ({
                isListerning: true,
                isProcessing: false,
                isSpeaking: false,
                isError: undefined,
                searchResults: res.toolResults
            }))
        })
            .catch(res => {
                set(e => ({
                    isListerning: true,
                    isProcessing: false,
                    isSpeaking: false,
                    isError: res,
                    searchResults: []
                }))
            })


    }
}))