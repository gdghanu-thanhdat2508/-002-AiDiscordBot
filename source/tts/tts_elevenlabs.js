"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.textToSpeechElevenLabs = void 0;
const state_1 = require("../state/state");
const crypto = __importStar(require("crypto"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class textToSpeechElevenLabs {
    async free() {
    }
    async init() {
    }
    async generate(text, args) {
        const id = crypto.randomUUID();
        let response;
        try {
            response = await fetch(`https://api.fpt.ai/hmi/tts/v5`, {
                method: "POST",
                headers: {
                    "api-key": `${state_1.Hikari.state.auth["APIKEY_HUGGINGFACE"]}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: text,
                })
            });
        }
        catch (e) {
            console.log(e);
            return {
                success: false, value: undefined
            };
        }
        const audio_path = path.join(process.cwd(), "assets", "audio", `${id}.mp3`);
        const reader = response.body?.getReader();
        while (true) {
            let data = await reader.read();
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
        };
    }
}
exports.textToSpeechElevenLabs = textToSpeechElevenLabs;
