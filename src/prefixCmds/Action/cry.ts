import { PrefixCommands } from "../../cmds";
import { EmbedBuilder } from "discord.js";
import axios from "axios";

export = {
  name: "cry",
  aliases: ['cry'],
  description: "Khóc huhu",
  usage: 'nqg cry',
  
  callback: async (client, message, args) => {
    axios.get("https://api.waifu.pics/sfw/cry").then((response) => {
      const data = response.data;

      const pat = data.url;

    
      const KissEmbed = new EmbedBuilder()
        .setImage(pat)
        .setColor(0xf000ff);
      message.channel.send({ embeds: [KissEmbed] });
    });
  },
} as const as PrefixCommands
