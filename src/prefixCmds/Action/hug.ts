import { AxiosResponse } from "axios";
import { PrefixCommands } from "../../cmds";

const axios = require("axios");
const Discord = module.require("discord.js");

export = {
  name: "om",
  aliases: ['hug'],
  description: "Ôm một ai đó",
  usage: 'nqg om <người dùng>',

  callback: async (client, message, args) => {
    axios.get("https://api.waifu.pics/sfw/hug").then((response: AxiosResponse) => {
      const member = message.mentions.members?.first();
      const data = response.data;

      const hug = data.url;

      if (!member) return message.reply("Cần để cập một người để ôm");
      if (member.id === message.author.id) {
        return message.reply('Bạn không thể tự ôm chính mình')
      }
      let HugEmbed = new Discord.EmbedBuilder()
        .setDescription(
          `**<@${message.author.id}> ôm ${member}, ỏooo cute <3, ỏooo cute <3**`
        )
        .setImage(hug)
        .setColor(0xf000ff);
      return message.channel.send({ embeds: [HugEmbed] });
    });
  },
} as const as PrefixCommands
