module.exports = (app) => {
    app.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        //await interaction.reply(`Running command: ${interaction.commandName}. For user: ${interaction.user}`);
        setTimeout(() => {}, 60);

        app.commands.get(interaction.commandName).run(app, ...[,], interaction);
    });
}