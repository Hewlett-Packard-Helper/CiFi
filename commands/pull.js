const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const cheerio = require('cheerio');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pull')
    .setDescription('Pulls website information')
    .addStringOption(option =>
              option.setName('URL')
              .setDescription('The URL to find info from')
              .setRequired(true));
    async execute(interaction) {
        const url = interaction.options.getString('URL')
        await interaction.reply('Sorry ${interaction.member.user.username}, because this command is bot complete, ${url} cannot be searched.')
    }
};
