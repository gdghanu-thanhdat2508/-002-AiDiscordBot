import { Hikari } from "../state/state";
import { Option } from "../types/option";
import { ILargeLanguageModel } from "./llms_interface";
const Groq = require("groq-sdk");

export class LargeLanguageHuggingFace implements ILargeLanguageModel {
    #groq: any;
    constructor() {
        if (typeof Hikari.state?.auth["APIKEY"] != "string") {
            console.error("Could not read API KEY from GROQ in .env file")
        }

        this.#groq = new Groq({
            apiKey: Hikari.state?.auth["APIKEY"]!,
        });
    }

    async init(): Promise<void> {

    };

    async free(): Promise<void> {

    };

    async generate(prompt: string): Promise<Option<string>> {
        const chatCompletion = await this.#groq.chat.completions.create({
            "messages": [
                {
                    "role": "system",
                    "content": Hikari.state?.characters["Hikari"]?.description!
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        });
        return {
            success: true,
            value: chatCompletion.choices?.[0]?.message?.content
        }
    }

}