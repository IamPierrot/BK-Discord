import { AxiosResponse } from "axios";
import { PrefixCommands } from "../../cmds";

const axios = require("axios");
const Discord = module.require("discord.js");

export = {
  name: "hon",
  description: "Hôn một ai đó",
  aliases: ["kiss"],
  usage: 'nqg hon <người dùng>',
  
  callback: async (client, message, args) => {
    axios.get("https://api.waifu.pics/sfw/kiss").then((response: AxiosResponse) => {
      const member = message.mentions.members?.first();
      const data = response.data;

      const hug = data.url;

      if (!member) return message.reply("Cần để cập một người để hôn");
      if (member.id === message.author.id) {
        return message.reply('Bạn không thể tự hôn chính mình!')
      }
    
      let KissEmbed = new Discord.EmbedBuilder()
        .setDescription(
          `**<@${message.author.id}> hôn ${member}, ỏooo cute <3, ỏooo cute <3**`
        )
        .setImage(hug)
        .setColor(0xf000ff);
      return message.channel.send({ embeds: [KissEmbed] });
    });
  },
} as const as PrefixCommands
