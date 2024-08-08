// import { usePlayer } from "@/lib/usePlayer";
import { CommandInput } from "../ui/command";
// import { useMicVAD, utils } from "@ricky0123/vad-react";
// import { useRef } from "react";
import { useAIControl } from "@/lib/state";

// const submit = async (blob: Blob) => {
//   console.log(blob);
// };

const CommandInputBar = () => {
  const { empty, searchAI } = useAIControl();
  const isDomainName = (input: string): boolean => {
    // Simple regex to check if the input looks like a domain name
    const domainRegex =
      /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(input);
  };
  const functionCalling = async (input: string) => {
    if (isDomainName(input)) {
      // Open the domain directly
      window.tabs.load(window.currentGroup, window.currentTab, `https://${input}`);
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
                  searchAI(value);
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
