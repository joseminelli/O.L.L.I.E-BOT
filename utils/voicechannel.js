const {GuildMember} = require("discord.js");

const isInVoiceChannel = (interaction) => {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
       interaction.reply({
            content: 'Você não está em um canal de voz!',
            ephemeral: true,
       });
       return false;
    }

    if (
        interaction.guild.members.me.voice.channelId &&
        interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
    ) {
        interaction.reply({
            content: 'Você não está no meu canal de voz!',
            ephemeral: true,
        });
        return false;
    }

    return true;
}

exports.isInVoiceChannel = isInVoiceChannel;