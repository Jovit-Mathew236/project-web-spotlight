type Dir = { path: string } & ({ isDir: true, dirs: Omit<Dir, "isDir">[] } | { isDir: false })

interface Window {
    tabs: {
        addTabs(tabs: Array<Array<string>>): boolean;
        requestSplitTab(url?: string): null
        requestFlipTabs(): null
        requestNewGroup(url: string): null
    }
    dialog: {
        closeDialog: () => void
    }
    fs: {
        listDir(path: string, subdir?: boolean): Dir[]
        getFileUrl(): string
        getFolderUrl(): string
    }
}

declare global {
    interface globalThis {
        window: Window
    }
}