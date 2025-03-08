import { Hikari } from "../state/state";
import { Option } from "../types/option";
import { TtsResult } from "../types/tts_result";
import { ITextToSpeech, TtsGenerationArgs } from "./tts_interface";
import * as crypto from "crypto"
import * as fs from "fs"
import * as path from "path"

export class textToSpeechElevenLabs implements ITextToSpeech {
    async free(): Promise<void> {

    }
    async init(): Promise<void> {

    }
    async generate(text: string, args: TtsGenerationArgs): Promise<Option<TtsResult>> {

        const id: string = crypto.randomUUID()

        let response: Response;
        try {
            response = await fetch(
                `https://api.fpt.ai/hmi/tts/v5`,
                {
                    method: "POST",
                    headers: {
                        "api-key": `${Hikari.state!.auth["APIKEY_HUGGINGFACE"]}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        inputs: text,
                    })
                }
            )
        } catch (e) {
            console.log(e)
            return {
                success: false, value: undefined
            }
        }

        const audio_path = path.join(process.cwd(), "assets", "audio", `${id}.mp3`)
        const reader = response.body?.getReader();

        while (true) {
            let data = await reader!.read();
            if (data.done) {
                break;
            }
            fs.appendFileSync(audio_path, Buffer.from(data.value.buffer));
        }

        return {
            success: true,
            value: {
                id: id,
                path: audio_path
            }
        }
    }
}