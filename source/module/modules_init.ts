import { InputSystemConsole } from "../input_system/input_console";
import { IInputSystem } from "../input_system/input_interface";
import { LargeLanguageHuggingFace } from "../llms/llm_huggingface";
import { ILargeLanguageModel } from "../llms/llms_interface";
import { Modules, Hikari } from "../state/state";
// import { textToSpeechElevenLabs } from "../tts/tts_elevenlabs";
// import { ITextToSpeech } from "../tts/tts_interface";

export async function initalizeModule(): Promise<void> {
    const llm: ILargeLanguageModel = new LargeLanguageHuggingFace();
    // const tts: ITextToSpeech = new textToSpeechElevenLabs();
    const input: IInputSystem = new InputSystemConsole();

    await Promise.all([
        llm.init(),
        // tts.init(),
        input.init()
    ])

    Hikari.modules = new Modules(llm, input);
}