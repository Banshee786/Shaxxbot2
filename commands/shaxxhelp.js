const { prefix } = require('../config.json');
const Discord = require("discord.js");

exports.run = async (client, message, args) => {

    // TODO: parse args for specific command, display command description on match

    //New embed
    const help = new Discord.MessageEmbed()
        .setDescription("Find the list of available commands on this panel.")
        .addField("**Music - (12)**", "`play`, `pause`, `resume`, `queue`, `clear-queue`, `shuffle`, `np`, `loop`, `volume`, `skip`, `stop`, `leave`")
        .addField("**Filters (Admin Only) - (18)**", "`bassboost`, `8D`, `vaporwave`, `nightcore`, `phaser`, `tremolo`, `vibrato`, `reverse`, `treble`, `normalizer`, `surrounding`, `pulsator`, `subboost`, `karaoke`, `flanger`, `gate`, `haas`, `mcompand`")
        .addField("**Informations - (1)**", "`ping`")
        .setFooter(`To use filters, ${prefix}filter (the filter). Example: ${prefix}filter 8D.`)
        .setColor("ORANGE");

    //Message
    message.channel.send(help);
}
