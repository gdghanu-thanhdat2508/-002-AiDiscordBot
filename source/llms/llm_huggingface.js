"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LargeLanguageHuggingFace = void 0;
const state_1 = require("../state/state");
const Groq = require("groq-sdk");
class LargeLanguageHuggingFace {
    #groq;
    constructor() {
        if (typeof state_1.Hikari.state?.auth["APIKEY"] != "string") {
            console.error("Could not read API KEY from GROQ in .env file");
        }
        this.#groq = new Groq({
            apiKey: state_1.Hikari.state?.auth["APIKEY"],
        });
    }
    async init() {
    }
    ;
    async free() {
    }
    ;
    async generate(prompt) {
        const chatCompletion = await this.#groq.chat.completions.create({
            "messages": [
                {
                    "role": "system",
                    "content": state_1.Hikari.state?.characters["Hikari"]?.description
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "model": "deepseek-r1-distill-llama-70b",
        });
        return {
            success: true,
            value: chatCompletion.choices?.[0]?.message?.content
        };
    }
}
exports.LargeLanguageHuggingFace = LargeLanguageHuggingFace;
