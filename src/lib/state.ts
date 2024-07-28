import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

type Web = {
    title:string
    url:string
}

type Group = Web[]

type State = {
    groups: Group[]
    getGroups: () => Group[] 

    downloads: string[]
    getDownloads: () => string[] 
}   

export const useSearchState = create<State>()((set, get) => ({
    downloads: [],
    groups: [], // call api here
    getDownloads: () => {
        const d = get().downloads

        if (d.length === 0) {
            const newDownloads:string[] = [] // call api

            set(e => ({...e, downloads:newDownloads}))

            return newDownloads
        }

        return d
    },
    getGroups: () => get().groups
}))