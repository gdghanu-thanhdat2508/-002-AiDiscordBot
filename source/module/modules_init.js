"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initalizeModule = initalizeModule;
const input_console_1 = require("../input_system/input_console");
const llm_huggingface_1 = require("../llms/llm_huggingface");
const state_1 = require("../state/state");
// import { textToSpeechElevenLabs } from "../tts/tts_elevenlabs";
// import { ITextToSpeech } from "../tts/tts_interface";
async function initalizeModule() {
    const llm = new llm_huggingface_1.LargeLanguageHuggingFace();
    // const tts: ITextToSpeech = new textToSpeechElevenLabs();
    const input = new input_console_1.InputSystemConsole();
    await Promise.all([
        llm.init(),
        // tts.init(),
        input.init()
    ]);
    state_1.Hikari.modules = new state_1.Modules(llm, input);
}
