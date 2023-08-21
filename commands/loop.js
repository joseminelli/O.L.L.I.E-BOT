const {GuildMember, ApplicationCommandOptionType} = require('discord.js');
const {QueueRepeatMode, useQueue} = require('discord-player');
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'loop',
    description: 'Coloca em modo loop',
    options: [
        {
            name: 'modo',
            type: ApplicationCommandOptionType.Integer,
            description: 'Tipo de loop',
            required: true,
            choices: [
                {
                    name: 'Off',
                    value: QueueRepeatMode.OFF,
                },
                {
                    name: 'Música',
                    value: QueueRepeatMode.TRACK,
                },
                {
                    name: 'Fila',
                    value: QueueRepeatMode.QUEUE,
                },
                {
                    name: 'Autoplay',
                    value: QueueRepeatMode.AUTOPLAY,
                },
            ],
        },
    ],
    async execute(interaction) {
        try {
            const inVoiceChannel = isInVoiceChannel(interaction)
            if (!inVoiceChannel) {
                return
            }

            await interaction.deferReply();

            const queue = useQueue(interaction.guild.id)
            if (!queue || !queue.currentTrack) {
                return void interaction.followUp({content: '❌ | Não tem músicas tocando'});
            }

            const loopMode = interaction.options.getInteger('modo');
            queue.setRepeatMode(loopMode);
            const mode = loopMode === QueueRepeatMode.TRACK ? '🔂' : loopMode === QueueRepeatMode.QUEUE ? '🔁' : '▶';

            return void interaction.followUp({
                content: `${mode} | Modo de loop atualizado!`,
            });
        } catch (error) {
            console.log(error);
            return void interaction.followUp({
                content: 'Ocorreu um erro ao executar o commando: ' + error.message,
            });
        }
    },
};
