const {GuildMember} = require('discord.js');
const {useQueue} = require('discord-player');
const {isInVoiceChannel} = require('../utils/voicechannel');

module.exports = {
  name: 'fila',
  description: 'Mostra a fila de músicas',
  async execute(interaction) {
    const inVoiceChannel = isInVoiceChannel(interaction);
    if (!inVoiceChannel) {
      return;
    }

    const queue = useQueue(interaction.guild.id);
    if (queue) {
      const trimString = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

      const upcomingTracksDescription = queue.tracks
        .map((track, index) => {
          return `${index + 1}. **${trimString(track.title, 50)}**`;
        })
        .join('\n');

      const currentTrack = queue.currentTrack;
      const currentTrackTitle = `🎶 | **${trimString(currentTrack.title, 50)}**`;

      return void interaction.reply({
        embeds: [
          {
            title: 'Fila de Músicas',
            fields: [
              {
                name: 'Tocando agora',
                value: currentTrackTitle.substring(0, 1024), // Limitando o tamanho para 1024 caracteres
              },
              {
                name: 'Próximas músicas\n',
                value: upcomingTracksDescription.substring(0, 1024), // Limitando o tamanho para 1024 caracteres
              },
            ],
            color: 0x0084FF,
          },
        ],
      });
    } else {
      return void interaction.reply({
        content: '❌ |Não tem músicas na fila',
      });
    }
  },
};
