"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initalizeModule = initalizeModule;
const input_console_1 = require("../input_system/input_console");
const llm_huggingface_1 = require("../llms/llm_huggingface");
const state_1 = require("../state/state");
const tts_elevenlabs_1 = require("../tts/tts_elevenlabs");
async function initalizeModule() {
    const llm = new llm_huggingface_1.LargeLanguageHuggingFace();
    const tts = new tts_elevenlabs_1.textToSpeechElevenLabs();
    const input = new input_console_1.InputSystemConsole();
    await Promise.all([
        llm.init(),
        tts.init(),
        input.init()
    ]);
    state_1.Hikari.modules = new state_1.Modules(llm, tts, input);
}
