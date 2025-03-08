import { getAuth } from "../auth/get_auth";
import { getCharacter } from "../characters/get_character";
import { IInputSystem } from "../input_system/input_interface";
import { ILargeLanguageModel } from "../llms/llms_interface";
import { ITextToSpeech } from "../tts/tts_interface";
import { Character } from "../types/character";
import { Message } from "../types/message";

export class State {
    auth: Record<string, string>
    characters: Record<string, Character>
    message_queue: Message[] = [];
    priority_queue: Message[] = [];

    constructor(_auth: Record<string, string>, _chars: Record<string, Character>) {
        this.auth = _auth
        console.log(_chars)
        this.characters = _chars
    }
}

export class Modules {
    llm: ILargeLanguageModel;
    tts: ITextToSpeech;
    input: IInputSystem;

    constructor(_llm: ILargeLanguageModel, _tts: ITextToSpeech, _input: IInputSystem) {
        this.llm = _llm
        this.tts = _tts
        this.input = _input
    }
}

export class HikariApp {
    state: State | undefined = undefined;
    modules: Modules | undefined = undefined;

    init() {
        this.state = new State(getAuth(), getCharacter());
    }
}

export let Hikari: HikariApp = new HikariApp()