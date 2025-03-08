"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.freeLoadedModule = freeLoadedModule;
const state_1 = require("../state/state");
async function freeLoadedModule() {
    // for (let [field, value] of Object.entries(Hikari.modules!)) {
    //     await (value as Module).free();
    // }
    const modules = state_1.Hikari.modules;
    await modules?.llm.free();
    await modules?.tts.free();
    await modules?.input.free();
    state_1.Hikari.modules = undefined;
}
