# CiFi
This is the documentation needed to use the CiFi template and modify it to your needs.
# How it works
## Language
CiFi uses the Discordjs language (uses node.js) to work properly.
## Getting it online
To get CiFi online, you must input your token, and other ID's in these fields

```json
{
  "token": "TOKEN-GOES-HERE",
  "clientId": "CLIENT-ID-GOES-HERE",
	"guildId": "GUILD-ID-GOES-HERE"
}
```
located in the "config.json" file.
## Install dependencies
To install the dependencies, it is recommended to download and install **npm**.
```bash
sudo apt-get install npm
```
NPM comes with node.js pre installed, but its required to update to version 18 or higher, as some dependencies rely on them. 
For linux, https://nodejs.org/en/download/package-manager/
For macOS, either download the latest version from https://nodejs.org, or use homebrew. https://brew.sh.
For windows, download the latest version from https://nodejs.org.
It is also recommended to install cheerio.
### INFO: npm Doesn't support NodeJS 10 and above.
## Installing DiscordJS
To install DiscordJS from npm, use:
```bash
sudo npm install discord.js
```
I have no knowledge of installing DiscordJS on other operating systems.
# Commands
You can edit the commands as per the DiscordJS documentation.
## What do they do
### Ping
```js
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with Pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
```
In this command, CiFi creates the "ping" command. This command then replies with "Pong!' upon use.
### User
```js
const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('user')
      .setDescription('Provides user info'),
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder()
	    .setColor(0x0099FF)
	    .setTitle(`${interaction.member.user.username}`)
	    .setAuthor({ name: 'CiFi'})
	    .setDescription(`The server is ${interaction.guild.name}`)
	    .addFields(
		      { name: `${interaction.member.user.username}`, value:  `${interaction.member.user.username} Joined on ${new Date(interaction.member.joinedAt).toUTCString()}` },
      )
	    .setImage(`${interaction.member.user.displayAvatarURL()}`)
	    .setTimestamp()
	    .setFooter({ text: 'Coded by Hewlett Packard#9932'});

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
```
This command is a little more complicated, but all it does is fetch the username of the user that used the command, when they joined, the server name, and their PFP, and sends it via an embed.
### Pull
(!This is still in development!)
```js
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
```
This command pulls the header and paragraph of a web page, then sends it via an embed. It looks similar to /user because this was pulled from User.
