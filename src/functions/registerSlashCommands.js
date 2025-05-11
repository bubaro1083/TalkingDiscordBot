const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const chalk = require("chalk");
const glob = require("glob");

const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN);

const testCommands = [
    {
        name: "thisisatest",
        description: "anotherdescription"
    }
]

function deleteGuildCommands()
{
    
}

module.exports = async (app) => {
    const commands = [];

    // Format the commands for the Discord REST API
    const foldersPath = path.join(__dirname, "../commands");
    // const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith(".js"));
    const commandFiles = glob.sync("**/*.js", {
        cwd: foldersPath,
        absolute: true
    });

    console.log(`${chalk.yellow("[!]")} Updating slash commands!`);
    for (const file of commandFiles)
    {
        // const filePath = path.join(foldersPath, file);
        // const command = require(filePath);
        const command = require(file);

        if ("config" in command && "run" in command)
        {
            commands.push(command.config);
        }
        else
        {
            // console.log(`${chalk.red("[-]")} The command at ${filePath} is missing a required "config" or "run" property.`);
            console.log(`${chalk.red("[-]")} The command at ${file} is missing a required "config" or "run" property.`);
        }
    }


    try
    {
        console.log(`Started updating ${commands.length} application (/) commands..`);

        const data = await rest.put(
            Routes.applicationGuildCommands("1371010619158954014", "1370972385716473981"),
            { body: commands}
        );

        console.log(`Successfully updated ${data.length} application (/) commands!`);
    }
    catch(exception)
    {
        console.log(exception);
    }
}