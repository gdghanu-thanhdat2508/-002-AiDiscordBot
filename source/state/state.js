"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hikari = exports.HikariApp = exports.Modules = exports.State = void 0;
const get_auth_1 = require("../auth/get_auth");
const get_character_1 = require("../characters/get_character");
class State {
    auth;
    characters;
    message_queue = [];
    priority_queue = [];
    constructor(_auth, _chars) {
        this.auth = _auth;
        console.log(_chars);
        this.characters = _chars;
    }
}
exports.State = State;
class Modules {
    llm;
    // tts: ITextToSpeech;
    input;
    constructor(_llm, _input) {
        //_tts: ITextToSpeech
        this.llm = _llm;
        // this.tts = _tts
        this.input = _input;
    }
}
exports.Modules = Modules;
class HikariApp {
    state = undefined;
    modules = undefined;
    init() {
        this.state = new State((0, get_auth_1.getAuth)(), (0, get_character_1.getCharacter)());
    }
}
exports.HikariApp = HikariApp;
exports.Hikari = new HikariApp();
