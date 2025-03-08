import { Hikari } from "../state/state";
export async function freeLoadedModule() {
    // for (let [field, value] of Object.entries(Hikari.modules!)) {
    //     await (value as Module).free();
    // }

    const modules = Hikari.modules;
    await modules?.llm.free();
    await modules?.tts.free();
    await modules?.input.free();
    Hikari.modules = undefined
}