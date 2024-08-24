import { AxiosResponse } from "axios";
import { PrefixCommands } from "../../cmds";

const Discord = require("discord.js");
const axios = require("axios");

export = {
  name: "bite",

  callback: async (client, message, args) => {
    axios.get("https://api.waifu.pics/sfw/bite").then((response: AxiosResponse) => {
      const member = message.mentions.members?.first();
      const data = response.data;

      const pat = data.url;

      if (!member) return message.reply("Cần để cập một người để cạp");
      if (member.id === message.author.id) {
        return message.channel.send("Đây đây tôi cạp đầu bạn cho...")
      }
    
      let KissEmbed = new Discord.EmbedBuilder()
        .setDescription(
          `**<@${message.author.id}> cạp ${member}**`
        )
        .setImage(pat)
        .setColor(0xf000ff);
      return message.channel.send({ embeds: [KissEmbed] });
    });
  },
} as const as PrefixCommands
