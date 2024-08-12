//@ts-nocheck
// import { usePlayer } from "@/lib/usePlayer";
import { CommandInput } from "../ui/command";
// import { useMicVAD, utils } from "@ricky0123/vad-react";
// import { useRef } from "react";
import { useAIControl } from "@/lib/state";
import { llama } from "@/model/init";
import { getTools } from "@/model/tools";

// const submit = async (blob: Blob) => {
//   console.log(blob);
// };

const presavedWebsites = [
    "https://www.google.com",
    "https://github.com",
    "https://groq.com",
];

const runtools = getTools(llama, window, presavedWebsites);

const CommandInputBar = ({setResponse}: {setResponse: (response: string) => void}) => {
  const { empty, searchAI } = useAIControl();
  const isDomainName = (input: string): boolean => {
    // Simple regex to check if the input looks like a domain name
    const domainRegex =
      /(^$|(http(s)?:\/\/)(localhost|([\w-]+\.)+[\w-]+)(:\d+)?([\w- ;,.\/?%&=]*))/;
    return domainRegex.test(input);
  };
  const functionCalling = async (input: string) => {
    if(input.substring(0, 3) === "/ai"){
      try{
        setResponse("Thinking...")
        const res = await runtools(input.substring(4));
        setResponse("")
        if(typeof(res.response.toolResults.at(-1)?.result) === "object"){
          setResponse(res.response.toolResults.at(-1)?.result.response)
        }else{
          setResponse(res.response.toolResults.at(-1)?.result)
        }
        
      }catch(error){
        console.error(error);
        setResponse("I'm sorry, something went wrong.")
      }
      return;
    }else if (isDomainName(input)) {
      // Open the domain directly
      window.tabs.load(window.currentGroup, window.currentTab, input);
    } else {
      // Redirect to Google search
      window.tabs.load(
        window.currentGroup,
        window.currentTab,
        `https://www.google.com/search?q=${encodeURIComponent(
          input
        )}&sourceid=chrome&ie=UTF-8`
      );
    }
    window.dialog.closeDialog()
  };
  // const inputRef = useRef<HTMLInputElement>(null);
  // const player = usePlayer();
  // const vad = useMicVAD({
  // 	startOnLoad: true,
  // 	onSpeechEnd: (audio) => {
  // 		player.stop();
  // 		const wav = utils.encodeWAV(audio);
  // 		const blob = new Blob([wav], { type: "audio/wav" });
  // 		submit(blob);
  // 		const isFirefox = navigator.userAgent.includes("Firefox");
  // 		if (isFirefox) vad.pause();
  // 	},
  // 	workletURL: "/vad.worklet.bundle.min.js",
  // 	modelURL: "/silero_vad.onnx",
  // 	positiveSpeechThreshold: 0.6,
  // 	minSpeechFrames: 4,
  // 	ortConfig(ort) {
  // 		const isSafari = /^((?!chrome|android).)*safari/i.test(
  // 			navigator.userAgent
  // 		);

  // 		ort.env.wasm = {
  // 			wasmPaths: {
  // 				"ort-wasm-simd-threaded.wasm":
  // 					"/ort-wasm-simd-threaded.wasm",
  // 				"ort-wasm-simd.wasm": "/ort-wasm-simd.wasm",
  // 				"ort-wasm.wasm": "/ort-wasm.wasm",
  // 				"ort-wasm-threaded.wasm": "/ort-wasm-threaded.wasm",
  // 			},
  // 			numThreads: isSafari ? 1 : 4,
  // 		};
  // 	},
  // });

  return (
    <CommandInput
      // ref={inputRef}
      onKeyDown={
        !empty
          ? undefined
          : (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const value = e.currentTarget.value;
                if (value?.length) {
                  functionCalling(value);
                  //searchAI(value);
                }
              }
            }
      }
      required
      placeholder="Type a command or search..."
    />
  );
};

export default CommandInputBar;
