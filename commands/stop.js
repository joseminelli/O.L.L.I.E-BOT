const {GuildMember} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'parar',
    description: 'Para todas as músicas e limpa a fila!',
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
        queue.node.stop()
        return void interaction.followUp({content: '🛑 | Parei de tocar sua música'});
    },
};
