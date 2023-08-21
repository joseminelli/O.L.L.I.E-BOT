const {GuildMember, ApplicationCommandOptionType} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'mover',
    description: 'Move a posição da música na fila!',
    options: [
        {
            name: 'música',
            type: ApplicationCommandOptionType.Integer,
            description: 'O número da música que você deseja mover',
            required: true,
        },
        {
            name: 'posição',
            type: ApplicationCommandOptionType.Integer,
            description: 'A posição que você deseja mover a música',
            required: true,
        },
    ],
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id)

        if (!queue || !queue.currentTrack)
            return void interaction.followUp({content: '❌ | No music is being played!'});

        const queueNumbers = [interaction.options.getInteger('música') - 1, interaction.options.getInteger('posição') - 1];

        if (queueNumbers[0] > queue.tracks.size || queueNumbers[1] > queue.tracks.size)
            return void interaction.followUp({content: '❌ | Track number greater than queue depth!'});

        try {
            const track = queue.node.remove(queueNumbers[0]);
            queue.node.insert(track, queueNumbers[1]);
            return void interaction.followUp({
                content: `✅ | Moved **${track}**!`,
            });
        } catch (error) {
            console.log(error);
            return void interaction.followUp({
                content: '❌ | Something went wrong!',
            });
        }
    },
};
