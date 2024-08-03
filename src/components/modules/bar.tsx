import { usePlayer } from "@/lib/usePlayer";
import { CommandInput } from "../ui/command";
import { useMicVAD, utils } from "@ricky0123/vad-react";
import { useRef } from "react";
import { useAIControl } from "@/lib/state";

const submit = async (blob: Blob) => {
	console.log(blob)
}

const functionCalling = async (input: string) => {
	console.log(input)
}

const CommandInputBar = () => {
	const { empty, searchAI } = useAIControl()
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
			onKeyDown={!empty ? undefined : (e: React.KeyboardEvent<HTMLInputElement>) => {
				if (e.key === "Enter") {
					e.preventDefault();
					const value = e.currentTarget.value;
					if (value?.length) {
						functionCalling(value);
						searchAI(value)
					}
				}
			}}
			required
			placeholder="Type a command or search..." />
	);
}

export default CommandInputBar;