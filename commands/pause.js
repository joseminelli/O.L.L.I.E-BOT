const {GuildMember} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'pausa',
    description: 'Pausa a música atual!',
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id)
        if (!queue || !queue.currentTrack)
            return void interaction.followUp({
                content: '❌ | Não tem música tocando',
            });
        const success = queue.node.pause()
        return void interaction.followUp({
            content: success ? '⏸ | Pausada!' : '❌ | Algo deu errado',
        });
    },
};
