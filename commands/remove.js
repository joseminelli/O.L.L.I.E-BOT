const {GuildMember, ApplicationCommandOptionType } = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
  name: 'remover',
  description: 'Remove a música da fila!',
  options: [
    {
      name: 'número',
      type: ApplicationCommandOptionType.Integer,
      description: 'O número da música que você deseja remover',
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
    if (!queue || !queue.currentTrack) return void interaction.followUp({content: '❌ | Não tem músicas tocando'});
    const number = interaction.options.getInteger('número') - 1;
    if (number > queue.tracks.size)
      return void interaction.followUp({content: '❌ | Número da música maior que a fila!'});
    const removedTrack = queue.node.remove(number);
    return void interaction.followUp({
      content: removedTrack ? `✅ | Removido **${removedTrack}**!` : '❌ | Algo deu errado!',
    });
  },
};
