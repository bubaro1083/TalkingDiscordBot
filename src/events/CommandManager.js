// Command Manager
// TODO: Add support for alias.
module.exports = (app) => {
    app.on("messageCreate", async (message) => {
        // Make sure message isnt from a bot or DM
        //if (message.author.bot || message.channel.type === "dm") { return; } // Prevents talking to bots and DM
        
        // Get prefix and prepare message as command
        const messageArray = message.content.split(" ");
        const cmd = messageArray[0];
        const args = messageArray.slice(1);
        const DeleteCommandMessage = true;
        
        
        // Check for prefix
        if (!cmd.startsWith(process.env.PREFIX)) { return; }
        const cmdNoPrefix = cmd.slice(process.env.PREFIX.length);
        
        // Get the command from the command collection and if found run command
        let commandFile = app.commands.get(cmd.slice(process.env.PREFIX.length));
        //if (commandFile) { commandFile.run(app, message, args); } 

        if (DeleteCommandMessage)
        {
            message.delete();
        }

        if (commandFile)
        {
            // Check permissions
            if (commandFile.config.accessableby && !message.member.roles.cache.some((role) => role.name === commandFile.config.accessableby))
            {
                return message.channel.send(cmdNoPrefix + " You do not have permission to use this command.");
            }
            if (commandFile.config.category && !message.member.roles.cache.some((role) => role.name === commandFile.config.category))
            {
                return message.channel.send(cmdNoPrefix + " You do not have permission to use this command.");
            }

            commandFile.run(app, message, args);
        }
        else
        {
            message.channel.send(cmdNoPrefix + " Command not found.");
        }
    });
}