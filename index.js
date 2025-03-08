"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const main_loop_1 = require("./source/main_loop/main_loop");
const modules_init_1 = require("./source/module/modules_init");
const state_1 = require("./source/state/state");
// Initialize the Discord bot client
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ]
});
// Main bot function
const main = async () => {
    console.log("Bot is starting...");
    state_1.Hikari.init();
    await (0, modules_init_1.initalizeModule)();
    // Login with your bot token
    await client.login(`${state_1.Hikari.state?.auth["APIKEY_DISCORDBOT"]}`);
};
// Listen for when the bot is ready
client.once("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});
// Listen for messages in the Discord server
client.on("messageCreate", async (message) => {
    if (message.author.bot)
        return;
    const botMention = `<@${client.user?.id}>`;
    if (message.content.startsWith(botMention)) {
        const userMessage = message.content.slice(botMention.length).trim();
        console.log(`User's Message: ${userMessage}`);
        // Process the message with mainLoop
        await (0, main_loop_1.mainLoop)(message, userMessage);
    }
});
// Start the bot
setImmediate(main);
