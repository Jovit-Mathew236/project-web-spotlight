type Dir = { path: string } & ({ isDir: true, dirs: Omit<Dir, "isDir">[] } | { isDir: false })

type OllamaResponse = {
    model: string;
    created_at: string;
    response: string;
    done: boolean;
    context: number[];
    total_duration: number;
    load_duration: number;
    prompt_eval_count: number;
    prompt_eval_duration: number;
    eval_count: number;
    eval_duration: number;
  };

interface Window {
    tabs: {
        addTabs(tabs: Array<Array<string>>): boolean;
        requestSplitTab(url?: string): null
        requestFlipTabs(): null
        requestNewGroup(url: string): null
        load(group: number, tab: number, url: string): null
    }
    dialog: {
        closeDialog: () => void
    }
    fs: {
        listDir(path: string, subdir?: boolean): Dir[]
        getFileUrl(): string
        getFolderUrl(): string
    },
    suggestions: {
        getDuckDuckGoSuggestions(text: string): Promise<{phrase: string}[]>
    },
    ai: {
        generate(model: string, text: string): Promise<OllamaResponse>
    }
    currentTab: number,
    currentGroup: number
}

declare global {
    interface globalThis {
        window: Window
    }
}