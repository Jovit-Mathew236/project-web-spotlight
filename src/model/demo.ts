import { getTools, llama } from "@/model/tools";

// @ts-ignore
const window:Window = {
    tabs: {
        addTabs: (tabs) => {
            console.log("Adding tabs:", tabs);
            return true;
        },
        requestSplitTab: (url) => {
            console.log("Splitting tab with URL:", url);
            return null;
        },
        requestFlipTabs: () => {
            console.log("Flipping tabs");
            return null;
        },
        requestNewGroup: (url) => {
            console.log("Creating new tab group with URL:", url);
            return null;
        }
    },
    dialog: {
        closeDialog: () => {
            console.log("Closing dialog");
        }
    },
    fs: {
        listDir: (path, subdir = false) => {
            console.log(`Listing directory: ${path}, include subdirs: ${subdir}`);
            return [{ path: `${path}/example`, isDir: true, dirs: [] }];
        },
        getFileUrl: () => {
            return "file:///example/file.txt";
        },
        getFolderUrl: () => {
            return "file:///example/folder";
        }
    }
};

const presavedWebsites = [
    "https://www.google.com",
    "https://github.com",
    "https://groq.com",

];

const runTool = getTools(llama, window, presavedWebsites)

const res = await runTool("yt groq")

console.log(res.toolResults)