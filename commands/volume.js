const {GuildMember, ApplicationCommandOptionType} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'volume',
    description: 'Muda o volume da música!',
    options: [
        {
            name: 'volume',
            type: ApplicationCommandOptionType.Integer,
            description: 'número entre 0-200',
            required: true,
        },
    ],
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id);
        if (!queue || !queue.currentTrack)
            return void interaction.followUp({
                content: '❌ | Não tem músicas tocando',
            });

        let volume = interaction.options.getInteger('volume');
        volume = Math.max(0, volume);
        volume = Math.min(200, volume);
        const success = queue.node.setVolume(volume);

        return void interaction.followUp({
            content: success ? `🔊 | Volume setado para ${volume}!` : '❌ | Algo deu errado',
        });
    },
};
