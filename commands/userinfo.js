const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Pega informações de um usuário',
    options: [
        {
            name: 'user',
            type: ApplicationCommandOptionType.User,
            description: 'O usuário que você deseja pegar as informações',
            required: true,
        },
    ],
    execute(interaction, client) {
        const user = interaction.options.getUser('user');

        interaction.reply({
            content: `Nome: ${user.username}, ID: ${user.id}, Avatar: ${user.displayAvatarURL({dynamic: true})}`,
            ephemeral: true,
        });
    },
};
