const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const cheerio = require('cheerio');
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { channel } = require('diagnostics_channel');
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');

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
      .setDescription('Pulls data from a website'),
  async execute(interaction, client) {
    // Create the modal
    const modal = new ModalBuilder()
  		.setTitle('My Modal')
  		.setCustomId('myModal')

    // Send the modal and wait for a response
    const favoriteColorInput = new TextInputBuilder()
			.setCustomId('favoriteColorInput')
		    // The label is the prompt the user sees for this input
			.setLabel("What's your favorite color?")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);

		const hobbiesInput = new TextInputBuilder()
			.setCustomId('hobbiesInput')
			.setLabel("What's some of your favorite hobbies?")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
		const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow);
    // Get the URL from the modal response
    await interaction.showModal(modal)

    // Get the data from the page
	client.on(Events.InteractionCreate, interaction => {
		if (!interaction.isModalSubmit()) return;
		console.log(interaction);
	});
    // Send the data in an embed
  }
}
