const {GuildMember} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'despausar',
    description: 'Despausa a música atual',
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
        const success = queue.node.resume()
        return void interaction.followUp({
            content: success ? '▶ | Despausado!' : '❌ | Algo deu errado!',
        });
    },
};
