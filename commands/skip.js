const {GuildMember} = require('discord.js')
const {useQueue} = require('discord-player')
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'pular',
    description: 'Pula uma música!',
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        await interaction.deferReply();

        const queue = useQueue(interaction.guild.id)
        if (!queue || !queue.currentTrack) return void interaction.followUp({content: '❌ | Não tem música tocando'});
        const currentTrack = queue.currentTrack;

        const success = queue.node.skip()
        return void interaction.followUp({
            content: success ? `✅ | Pulada **${currentTrack}**!` : '❌ | Algo deu errado!',
        });
    },
};
