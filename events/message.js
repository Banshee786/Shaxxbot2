const { prefix } = require('../config.json');

module.exports = (client, message) => {

    //debugging tool
    console.log(message.content);

    //Ignoring users not in server
    if (!message.guild) return;

    //Ignore all bots
    if (message.author.bot) return;

    //Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(prefix) !== 0) return;

    // quotes
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

    if (message.mentions.has(message.client.user)) {
        message.channel.send(quotes[rand]);
    }

    //Our standard argument/command name definition.
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    //Grab the command data from the client.commands (Discord collection)
    const cmd = client.commands.get(command);
  
    //If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;
  
    //Run the command
    cmd.run(client, message, args);

};
