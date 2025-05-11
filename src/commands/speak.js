const { Client, Message, CommandInteraction, ApplicationCommandOptionType } = require("discord.js");

module.exports = { 
    config: {
        name: "speak",
        description: "Make ALS speak in a text channel.",
        usage: "!speak <channel> <message>",
        category: "Owner", // Experimental
        accessableby: "Owner", // Experimental
        options: [
            {
                name: "channel",
                description: "The voice channel to join.",
                type: ApplicationCommandOptionType.Channel,
                required: true
            },
            {
                name: "message",
                description: "The message to speak.",
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },

    /**
     * 
     * @param {Client} app 
     * @param {Message} message 
     * @param {CommandInteraction} interaction 
     * @param {Array} args 
     */

    async run(app, message, interaction, args) {
        const input = message || interaction;

        // Check if the user has the "Owner" role
        // if (!input.member.roles.cache.some((role) => role.name === "Owner" || role.name === "Co-Owner")) {
        //     return input.reply("Invalid permissions.");
        // }

        // Ensure the command is used in a server
        if (!input.guild) {
            return input.reply("This command can only be used in a server.");
        }

        const channel = input.options.getChannel("channel");
        const messageToSpeak = input.options.getString("message");
        
        // Make it speak in the text channel
        input.guild.channels.cache.get(interaction.options.getChannel("channel").id).send(interaction.options.getString("message"));
        input.reply({ content: "Sent :3", ephemeral: true });
    }
}