const { prefix } = require('./config.json');
const { token, youtubeAPI } = require('./secrets.json');

const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
const MusicBotAddon = require("discord-dynamic-music-bot-addon");
const options = {
    // messageUpdateRate: number, // how fast should message be updated in second. Under 5 seconds its not going to work. (default: 5)
    // selfDeleteTime: number, // error message that bot sends to notify user about something are going to delete in seconds. (default: 5)
    leaveVoiceChannelAfter: 20, // when there isn't playing anything when should bot leave the channel is seconds. (default: 20)
    leaveVoiceChannelAfterAllMembersLeft: 20, // when no one is in channel and nothing is playing when should bot leave the channel is seconds. (default: 20)
    // maxTrackLength: number, // How long can requested track be in minutes. (default: 180 )
    // autoQueryDetection: boolean, // Smart feature a user only have to type player command and youtube url link and its going to automatically search or look for url. (default: true)
    // autoPlaylistDetection: boolean, // should autoQueryDetection look for playlist link and automatically parse them? (default: false)
    // waitTimeBetweenTracks: number,   // how longs should bot wait between switching tracks in seconds. (default: 2)
    // maxItemsInPlayList: number, // how many songs can playlist have in it. (default: 100)
    // maxUserItemsInPlayList: number,  // how many songs can user have in playlist (default: 10)
    // playlistParseWait: number, // wait time between fetching each track form playlist in seconds (default: 2)
    // multipleParser: boolean, // should bot look for multiple url in one message eg (player yt_url yt_url) (default: true)
    // playlistParse: boolean, // should bot parse playlists at all? (default: false)
    // votePercentage: number, // how many votes in percentage are required to perform vote action in percentage (default: 60)
    // coolDown: number, // how repeatedly can user send bot command. It's recommended to be higher tan 5 seconds in seconds (default: 5)
    // deleteUserMessage: boolean, // should delete user command messages (default: true)
    // hardDeleteUserMessage: boolean, // should delete every user message when the player is active (default:false)
    reactionButtons: true, // should add reaction button to easily control the player with out entering commands (default: true)
    // suggestReplay: number, // should bot offer you a replay after the end of the song in seconds 0 to disable the feature (default: 20)
    // https://github.com/Lidcer/DiscordDynamicMusicBotAddon/blob/master/example/language.json.
    // language: language, // Custom language pack is check url above. By defining custom command you are only added aliases to existing commands the default ones are still going to be available
};
const youtubePlayer = new MusicBotAddon.YoutubePlayer(youtubeAPI, options);

client.commands = new Discord.Collection();
//const Music = require('NEED NEW DISCORD MUSIC ADDON');
//that should be all the prereqs... hopefully

//start of command structure
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Prefix is ${prefix}.`);
    client.user.setActivity('!shaxxhelp', { type: 'WATCHING' });
});

//TODO: Error reporting, somehow


client.on('message', msg => {
    //debugging tool
    //console.log(msg.content);

    //Ignoring users not in server
    if (!msg.guild) return;

    //Ignoring other bots
    if (msg.author.bot) {
        console.log('Ignoring msg from other bot: ' + msg.author.username + '#' + msg.author.discriminator);
        return;
    }

    //To log what the bot is responding to
    //if (!msg.content.startsWitch(prefix)) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'leave') {
        if (msg.member.voiceChannel) {
            msg.member.voiceChannel.leave();
        }
    }

    let quotes = [
        `Fight forever guardian!`,
        `Stop it! You're SCARING THEM!`,
        `Was that all of them? THAT WAS ALL OF THEM?`,
        `Get back out there.`,
        `Step up.`,
        `Hey... hit me... hard as you can.`,
        `No need to be polite.`,
        `You want the Crucible? I *am* the Crucible.`,
        `You look like you've got what it takes.`,
        `The darkness may as well come in and take the place if that's all we've got.`,
        `Rise and shine, Guardian.`,
        `Cayde ran through the Crucible like it was a game... sly bastard.`,
        `Honor is earned.`,
        `Are you ready, Oryx slayer?`,
        `I trust you're prepared, Hive slayer.`,
        `I'm not gonna tell you how I lost the horn; you couldn't handle it.`,
        `I'd tell you to hit me, but I think it would hurt.`,
        `Wasting my time is no way to impress me, Dreg.`,
        `Work together. And you might survive.`,
        `No holding back! Your enemies won't!`,
        `Watch your back, Guardian. No one else will.`,
        `Haha! The Crucible is no place for mercy.`,
        `Oh, did they ever stand a chance.`,
        `You fight to win, Guardian. So fight.`,
        `Regroup and combine your efforts. Or suffer the consequences.`,
        `I can't believe what I'm seeing!`,
        `What I wouldn't give to fight again beyond the walls. I would tear out a Vex heart with my teeth! I would sear the Cabal with my burning Light, challenge the Fallen Kells to personal combat and scatter them! I... I've been watching too many Crucible matches.`,
        `With ten like you. I could end the war.`,
        `Let them burn in your light.`,
        `My... this is... this is beautiful... You continue to be my greatest success, Guardian.`,
        `Always good to see another hero of the Tower.`,
        `WHAT DO YOU MEAN YOU CANT CONCENTRATE WHEN I'M SHOUTUNG, GET BACK OUT THERE!`,
        `They can't win if they're dead! Haha!`,
        `Your enemy understands the art of demolition. You'll get there.`,
        `Fought like a Titan of the First Pillar!`,
        `Ikora would be proud of you, Warlock!`,
        `Hunters like you blaze a path for the rest of us!`,
        `Who says Warlocks are better with books than with guns? OK... it was me. But I was lying. Rage is an excellent motivator.`,
        `I DON'T EVEN KNOW WHO TO BE ANGRY AT!`,
        `You're crushing them. Send them home crying.`,
    ];
    var rand = Math.floor(Math.random() * quotes.length);

    if (msg.mentions.has(client.user)) {
        msg.channel.send(quotes[rand]);
    }

    if (client.commands.has(command)) {
        //commands must start with the prefix,
        //but do it here so that tags will still work
        if (!msg.content.startsWith(prefix)) return;
        try {
            client.commands.get(command).execute(msg, args);
        } catch (error) {
            console.error(error);
            msg.reply('That command does not work around here, guardian...');
        }
    } else {
        youtubePlayer.onMessagePrefix(msg, prefix);
    }
});

client.login(token);