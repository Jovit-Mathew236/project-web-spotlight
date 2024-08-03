import { groqVoice } from "./init";

export async function getTranscript(input: string | File) {
    if (typeof input === "string") return input;

    try {
        const { text } = await groqVoice.audio.transcriptions.create({
            file: input,
            model: "whisper-large-v3",
        });

        return text.trim() || null;
    } catch {
        return null; // Empty audio file
    }
}

// const cartesia = "https://api.cartesia.ai/tts/bytes"

// export const getVoice = async (response: string) => {
//     try {

//         const voice = await fetch(cartesia, {
//             method: "POST",
//             headers: {
//                 "Cartesia-Version": "2024-06-30",
//                 "Content-Type": "application/json",
//                 "X-API-Key": process.env.CARTESIA_API_KEY ?? "",
//             },
//             body: JSON.stringify({
//                 model_id: "sonic-english",
//                 transcript: response,
//                 voice: {
//                     mode: "id",
//                     id: "79a125e8-cd45-4c13-8a67-188112f4dd22",
//                 },
//                 output_format: {
//                     container: "raw",
//                     encoding: "pcm_f32le",
//                     sample_rate: 24000,
//                 },
//             }),
//         })

//         if (voice.ok) voice.
//     }
//     catch(e) {
//         console.log(e)
//         return null
//     }
// }