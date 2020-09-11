exports.run = async (client, message, args) => {
    if (message.member.voiceChannel) {
        message.member.voiceChannel.leave();
    }
}