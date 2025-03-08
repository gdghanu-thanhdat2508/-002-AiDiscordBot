import { Client, GatewayIntentBits } from 'discord.js';
import { mainLoop } from "./source/main_loop/main_loop";
import { initalizeModule } from "./source/module/modules_init";
import { Hikari } from "./source/state/state";

// Initialize the Discord bot client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// Main bot function
const main = async (): Promise<void> => {
    console.log("Bot is starting...");

    Hikari.init();
    await initalizeModule();

    // Login with your bot token
    await client.login(`${Hikari.state?.auth["APIKEY_DISCORDBOT"]!}`);
};

// Listen for when the bot is ready
client.once("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

// Listen for messages in the Discord server
client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    const botMention = `<@${client.user?.id}>`;

    if (message.content.startsWith(botMention)) {
        const userMessage = message.content.slice(botMention.length).trim();
        console.log(`User's Message: ${userMessage}`);

        // Process the message with mainLoop
        await mainLoop(message, userMessage);
    }
});

// Start the bot
setImmediate(main);
