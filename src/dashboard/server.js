const express = require("express");
const chalk = require("chalk");
const { Client } = require("discord.js");

const app = express();
const port = process.env.PORT || 3000;

module.exports = (client) => {
    /**
     * 
     * @type {Client}
     */
    this.discordApp = client;
}

app.get("", (req, res) => {
    res.send("Hello, World!");
});

app.get("/status", (req, res) => {
    res.sendStatus(200).send("Online");
});

app.listen(port, () => {
    console.log(`${chalk.green("[+]")} Started dashboard server on port: ${port}!`);
    
    // this.discordApp.on("ready", () => {
    //     this.discordApp.channels.cache.get("1193977308416061480").send("ATTENTION: This is a test from the Foundation Control System.");
    // })
});