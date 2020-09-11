exports.run = async (client, message, args) => {
    if (message.member.voiceChannel) {
      if(client.player.isPlaying(message.guild.id)) {
        client.player.stop(message.guild.id);
      }
        message.member.voiceChannel.leave();
    }
}
