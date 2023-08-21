const {GuildMember, ApplicationCommandOptionType} = require('discord.js');
const {QueryType, useMainPlayer} = require('discord-player');
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'play',
    description: 'Toca uma música!',
    options: [
        {
            name: 'query',
            type: ApplicationCommandOptionType.String,
            description: 'Música que você deseja tocar',
            required: true,
        },
    ],
    async execute(interaction) {
        try {
            const inVoiceChannel = isInVoiceChannel(interaction)
            if (!inVoiceChannel) {
                return
            }

            await interaction.deferReply();

            const player = useMainPlayer()
            const query = interaction.options.getString('query');
            const searchResult = await player.search(query)
            if (!searchResult.hasTracks())
                return void interaction.followUp({content: 'Não encontrei nada!'});

            try {
                const res = await player.play(interaction.member.voice.channel.id, searchResult, {
                    nodeOptions: {
                        metadata: {
                            channel: interaction.channel,
                            client: interaction.guild?.members.me,
                            requestedBy: interaction.user.username
                        },
                        leaveOnEmptyCooldown: 300000,
                        leaveOnEmpty: true,
                        leaveOnEnd: false,
                        bufferingTimeout: 0,
                        volume: 12,
                        //defaultFFmpegFilters: [ 'bassboost', 'normalizer']
                    }
                });

                await interaction.followUp({
                    content: `⏱ | Carregando ${searchResult.playlist ? 'playlist' : 'música'}...`,
                });
            } catch (error) {
                await interaction.editReply({
                    content: 'Ocorreu um erro!'
                })
                return console.log(error);
            }
        } catch (error) {
            await interaction.reply({
                content: 'Ocorreu um erro ao executar o comando: ' + error.message,
            });
        }
    },
};
