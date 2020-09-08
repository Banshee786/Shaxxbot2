const { prefix } = require('./config.json');
const { token, youtubeAPI } = require('./secrets.json');

const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();

const { Player } = require("discord-player");
const musicbot = new Player(client);
client.player = musicbot;

client.commands = new Discord.Collection();
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


client.on('message', async (msg) => {
    //debugging tool
    console.log(msg.content);

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
    console.log(`command was ${command}`);
    console.log(`remaining args: ${args.join(' ')}`);

    if (command === 'leave') {
        if (msg.member.voiceChannel) {
            msg.member.voiceChannel.leave();
        }
    }

    if (command === 'help') {
        let helpList = '\n';
        client.commands.forEach(command => {
            helpList += `${command.name} : ${command.description}\n`;
        });
        msg.reply(helpList);
        return;
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
            await client.commands.get(command).execute(msg, args);
        } catch (error) {
            console.error(error);
            msg.reply('That command does not work around here, guardian...');
        }
    // } else {
        // if (command == 'play') {
        //     let track = await client.player.play(msg.member.voice.channel, args.join(' '), msg.member.user.tag);
        //     msg.channel.send(`Currently playing ${track.name}! - Requested by ${track.requestedBy}`);
        // } else {
            // msg.reply('unknown command');
        // }
    }
});

// client.on("error", console.error);
// client.on("debug", console.info);

client.login(token);