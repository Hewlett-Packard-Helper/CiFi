const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
      .setName('user')
      .setDescription('Provides user info'),
  async execute(interaction) {
    await interaction.reply(`${interaction.user.username} joined on ${interaction.member.joinedAt}`);
  },
};
