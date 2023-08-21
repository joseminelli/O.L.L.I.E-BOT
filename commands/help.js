const fs = require('fs');

module.exports = {
    name: 'help',
    description: 'Lista todos os comandos.',
    execute(interaction) {
        let str = '';
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`./${file}`);
            str += `> **•** **${command.name}** **-** ${command.description} \n`;
        }

        return void interaction.reply({
            content: 
            ` **----------- Comandos -----------**\n${str} `,
            ephemeral: true,
        });
    },
};
