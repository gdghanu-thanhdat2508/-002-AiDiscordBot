import { Hikari } from "../state/state";
import { LongTermMemory } from "../ltm/LongTermMemory";
import { Message } from "discord.js";
const memory = new LongTermMemory();

const MAX_MESSAGE_LENGTH = 2000;

export async function mainLoop(message: Message, userMessage: string): Promise<void> {
    await memory.init();

    const pastMessages = await memory.query("User");

    const prompt =
        pastMessages.length > 0
            ? `Previous conversations:\n${pastMessages.join("\n")}\n\nUser: ${userMessage}`
            : userMessage;

    const result = await Hikari.modules!.llm.generate(prompt);
    const response = result.value;
    const cleanedResponse = response?.replace(/<think>[\s\S]*?<\/think>/, "").trim();

    if (!result.success) {
        console.error("Failed to get response from LLM");
        return;
    }

    console.log("LLM Response:", cleanedResponse);

    await memory.store("User", userMessage);
    await memory.store("Hikari", cleanedResponse!);

    if (cleanedResponse && cleanedResponse.length > MAX_MESSAGE_LENGTH) {
        let remainingResponse = cleanedResponse;
        while (remainingResponse.length > MAX_MESSAGE_LENGTH) {
            await message.reply(remainingResponse.substring(0, MAX_MESSAGE_LENGTH));
            remainingResponse = remainingResponse.substring(MAX_MESSAGE_LENGTH);
        }

        if (remainingResponse.length > 0) {
            await message.reply(remainingResponse);
        }
    } else {
        await message.reply(cleanedResponse!);
    }
}
