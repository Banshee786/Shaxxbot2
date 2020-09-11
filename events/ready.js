const { prefix } = require('../config.json');

module.exports = async (client) => {

    //If the bot is ready it sends a message in the console
    console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);

    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Prefix is ${prefix}.`);
    client.user.setActivity('shaxx musicbot', {type: 'WATCHING'})
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}. Type !shaxxhelp for more info.`))
        .catch(console.error);
}
