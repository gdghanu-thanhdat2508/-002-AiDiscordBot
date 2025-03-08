import { Module } from "../module/module_interface";
import { Option } from "../types/option";
import { TtsResult } from "../types/tts_result";


export type TtsGenerationArgs = {
    voice: string;
}

export interface ITextToSpeech extends Module {
    generate(text: string, args: TtsGenerationArgs): Promise<Option<TtsResult>>;
}