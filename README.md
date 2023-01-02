# HewlettHelper
This is the documentation needed to use the HewlettHelper template and modify it to your needs.
# How it works
## Language
HewlettHelper uses the Discordjs language (uses node.js) to work properly.
## Getting it online
To get HewlettHelper online, you must input your token, and other ID's in these fields

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
## Commands
You can edit the commands as per the DiscordJS documentation.
