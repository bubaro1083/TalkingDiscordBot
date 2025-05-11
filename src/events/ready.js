module.exports = (app) => {
    app.on("ready", () => {
        app.user.setActivity("SPEAKING LIKE A CHAD");
        console.log(`${app.user.username}, is online!`);
    })
}