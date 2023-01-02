const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const cheerio = require('cheerio')

async function getDataFromPage(url) {
  const response = await fetch(url);
  const data = await response.text();
  const $ = cheerio.load(data);
  const header = $('h1').text();
  const paragraph = $('p').first().text();
  return { header, paragraph };
}

module.exports = {
  data: new SlashCommandBuilder()
      .setName('pull')
      .setDescription('Pulls data from a website using cheerio'),
  async execute(interaction) {
    const url = 'https://example.com';
    const data = await getDataFromPage(url);
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`${interaction.member.user.username}`)
      .setAuthor({ name: 'HewlettHelper', iconURL: 'https://i.imgur.com/BndcSnQ.png'})
      .setDescription(`The server is ${interaction.guild.name}`)
      .addFields(
        { name: `${interaction.member.user.username}`, value:  `${interaction.member.user.username} Joined on ${new Date(interaction.member.joinedAt).toUTCString()}` },
        { name: 'Header', value: data.header },
        { name: 'Paragraph', value: data.paragraph },
      )
      .setImage(`${interaction.member.user.displayAvatarURL()}`)
	  }
	}
