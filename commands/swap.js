const {GuildMember, ApplicationCommandOptionType} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'swap',
    description: 'Troca a posição de duas músicas na fila!',
    options: [
        {
            name: 'música1',
            type: ApplicationCommandOptionType.Integer,
            description: 'O número da música que você deseja trocar de posição',
            required: true,
        },
        {
            name: 'música2',
            type: ApplicationCommandOptionType.Integer,
            description: 'O número da música que você deseja trocar de posição',
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
        if (!queue || !queue.currentTrack) return void interaction.followUp({content: '❌ | No music is being played!'});
        const queueNumbers = [interaction.options.getInteger('música1') - 1, interaction.options.getInteger('música2') - 1];
        // Sort so the lowest number is first for swap logic to work
        queueNumbers.sort(function (a, b) {
            return a - b;
        });
        if (queueNumbers[1] > queue.getSize())
            return void interaction.followUp({content: '❌ | Número da música maior que a fila!'});

        try {
            const track2 = queue.node.remove(queueNumbers[1]); // Remove higher track first to avoid list order issues
            const track1 = queue.node.remove(queueNumbers[0]);
            queue.node.insert(track2, queueNumbers[0]); // Add track in lowest position first to avoid list order issues
            queue.node.insert(track1, queueNumbers[1]);
            return void interaction.followUp({
                content: `✅ | Trocada **${track1}** & **${track2}**!`,
            });
        } catch (error) {
            console.log(error);
            return void interaction.followUp({
                content: '❌ | Algo deu errado!',
            });
        }
    },
};
