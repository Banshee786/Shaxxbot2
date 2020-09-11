// config files
const { prefix } = require('./config.json');
// const { token, youtubeAPI } = require('./secrets.json');
const { token } = require('./secrets.json');

// modules
const fs = require('fs');
const Discord = require('discord.js');
const { Player } = require('discord-player');

// new client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// new player
const musicbot = new Player(client);
client.player = musicbot;


// events
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading event ${eventName}`);
        client.on(eventName, event.bind(null, client));
    });
});

// commands
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
});

// quotes moved to ./events/message.js

client.on("error", console.error);
// client.on("debug", console.info);

client.login(token);