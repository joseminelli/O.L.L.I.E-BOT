const {GuildMember} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'embaralhar',
    description: 'Embaralha a fila de músicas',
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id)
        if (!queue || !queue.currentTrack) return void interaction.followUp({content: '❌ | Não tem música tocando'});
        try {
            queue.tracks.shuffle();
            const trimString = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
            return void interaction.followUp({
                content: '✅ | A fila de músicas foi embaralhada, veja ela com o comando **/fila**!',
            });
        } catch (error) {
            console.log(error);
            return void interaction.followUp({
                content: '❌ | Algo deu errado!',
            });
        }
    },
};
