import { AxiosResponse } from "axios";
import { PrefixCommands } from "../../cmds";
const axios = require("axios");
const Discord = module.require("discord.js");

export = {
  name: "liem",
  aliases: ['lick'],
  description: "Liếm một ai đó",
  usage: 'nqg liem <người dùng>',

  callback: async (client, message, args) => {
    axios.get("https://api.waifu.pics/sfw/lick").then((response: AxiosResponse) => {
      const member = message.mentions.members?.first();
      const data = response.data;

      const lick = data.url;

      if (!member) return message.reply("Cần để cập một người để liếm");
      if (member.id === message.author.id) {
        return message.reply('Bạn không thể tự liếm chính mình!')
      }

      let lickEmbed = new Discord.EmbedBuilder()
        .setDescription(
          `**<@${message.author.id}> lick ${member}, ỏooo cute <3 ỏ cute thế <3**`
        )
        .setImage(lick)
        .setColor(0xf000ff);
      return message.channel.send({ embeds: [lickEmbed] });
    });
  },
} as const as PrefixCommands
