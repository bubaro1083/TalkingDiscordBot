const { Collection } = require("discord.js");
const fs = require("fs");
const glob = require("glob");
const pathMod = require("path");
const chalk = require("chalk");
const { isObject } = require("../utils/utils.js");

// TODO: Add ability to loop through sub-folders also.

module.exports = (path) => {
    if (!fs.existsSync(path))
    {
        //TODO: Implement path not found
        console.log(`PATH DOES NOT EXIST ${path}`);
        return;
    }

    const commands = new Collection();
    let success = 0;
    let failed = 0;

    const CommandFiles = glob.sync("**/*.js", {
        cwd: path,
        absolute: true
    });
    

    if (CommandFiles.length <= 0)
    {
        console.log("Found no files, skipping.");
        return;
    }

    console.log(`Found ${CommandFiles.length} files! Attemping to load!`);

    for (const File of CommandFiles)
    {
        const props = require(File);
        const isClass = !isObject(props) && props.toString().includes("class") // Detect if object is a class

        try
        {
            if ("config" in props && "run" in props)
            {
                commands.set(props.config.name, props);

                success++;
                console.log(`${chalk.green("[+]")} Loaded: ${File}`);                
            } else console.log(`${chalk.red("[-]")} Failed to load: ${File} is missing a required "config" or "run" property.`), failed++;
        }
        catch (exception)
        {
            console.error(`${chalk.red("[-]")} Failed to load: ${File}`);
            console.error(exception);
            failed++;
        }
    }

    console.log(`${chalk.yellow("[!]")} Sucess: ${success}, Failed: ${failed}`);

    return commands;
}