const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("node:path");
const chalk = require("chalk");

// Load .ENV
require("dotenv").config({
    path: path.resolve(process.cwd(), ".env")
});
console.log(`${chalk.green("[+]")} Loaded .ENV!`);

// Create Client
const app = new Client({
    intents: [
        GatewayIntentBits.Guilds, // For guilds
        GatewayIntentBits.GuildMembers, // For guild members
        GatewayIntentBits.GuildMessages, // For guild messages
        GatewayIntentBits.MessageContent, // For message content
        GatewayIntentBits.GuildModeration, // For moderation events
        GatewayIntentBits.DirectMessages, // For DMs

        GatewayIntentBits.GuildVoiceStates, // For voice channels
        GatewayIntentBits.GuildPresences, // For presence updates
        GatewayIntentBits.GuildMessageTyping, // For typing events
        GatewayIntentBits.GuildEmojisAndStickers, // For emoji and sticker events
    ]
});

console.log(`${chalk.green("[+]")} Created client!`);

// Add Commands
app.commands = require("./functions/loadCommands")(process.cwd() + "/src/commands/");
if (!app.commands)
{
    console.log("Could not load commands!")
    return;
}

// Register (/) commands
require("./functions/registerSlashCommands.js")(app.commands); // Dont constently run

// Add Events (MAKE ME MORE NEAT PLEASE)
const eventsFolder = path.join(__dirname, "./events");
const eventsFolders = fs.readdirSync(eventsFolder).filter(item => fs.statSync(path.join(eventsFolder,item)).isDirectory());
fs.readdirSync(eventsFolder).filter(file => file.endsWith(".js")).forEach(file => require(`${process.cwd()}/src/events/${file}`)(app));

for (const folder of eventsFolders)
{
    const events = fs.readdirSync(path.join(eventsFolder, folder)).filter(file => file.endsWith(".js"));

    for (const event of events)
    {
        require(path.join(eventsFolder, folder, event))(app);
    }
}

// Check for updates
if (LATEST_UPDATE !== "")
{
    console.log(`Application updates found! ${LATEST_UPDATE}`);
}
else
{
    console.log("No updates detected!");
}

if (killDynoMode)
{
    app.on("messageCreate", (message) => {
        if (message.author.bot && message.author.username === "Dyno" && message.deletable && message.channelId === "1067984247962488936")
        {
            message.delete();
        }
    });
}

// Login
// console.log(`Attemping to create bot using token:\t ${process.env.DISCORD_BOT_TOKEN}`);
// console.log(`Attemping to create bot using token:\t ${chalk.hidden(process.env.DISCORD_BOT_TOKEN)}`);
console.log("Bot Token (first 8 chars):", process.env.DISCORD_BOT_TOKEN.substring(0, 8), "*** (rest hidden)");
app.login(process.env.DISCORD_BOT_TOKEN);
console.log(`${chalk.green("[+]")} Bot created!`);

app.voiceChannels = new Map(); // Map of voice channels

// Start dashboard server
console.log("Attemping to start dashboard server..");
require("./dashboard/server.js")(app);
require("./functions/websocket.js")(app);