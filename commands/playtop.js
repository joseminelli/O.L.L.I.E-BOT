const {GuildMember, ApplicationCommandOptionType} = require('discord.js');
const {QueryType, useQueue, useMainPlayer} = require('discord-player');
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'playtop',
    description: 'Toca uma música da fila a sua frente!',
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
            const searchResult = await player
                .search(query, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO,
                })
                .catch(() => {
                });
            if (!searchResult || !searchResult.tracks.length)
                return void interaction.followUp({content: 'Sem resutados'});

            const queue = useQueue(interaction.guild.id)

            try {
                if (!queue.connection) await queue.connect(interaction.member.voice.channel);
            } catch {
                return void interaction.followUp({
                    content: 'Não consegui entrar no seu canal!',
                });
            }

            await interaction.followUp({
                content: `⏱ | Carregando sua ${searchResult.playlist ? 'playlist' : 'música'}...`,
            });
            searchResult.playlist ? queue.node.insert(searchResult.tracks, 0) : queue.node.insert(searchResult.tracks[0], 0);
            if (!queue.currentTrack) await player.play();
        } catch (error) {
            console.log(error);
            await interaction.followUp({
                content: 'Ocorreu um erro ao executar o comando: ' + error.message,
            });
        }
    },
};
