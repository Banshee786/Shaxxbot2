module.exports = {
    name: 'play',
    description: 'make music',
    execute(message, args) {
        let track = message.client.player.play(message.member.voice.channel, args.join(' '), message.member.user.tag);
        message.channel.send(`Currently playing ${track.name}! - Requested by ${track.requestedBy}`);
    },
};