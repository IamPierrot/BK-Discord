import { AxiosResponse } from "axios";
import { PrefixCommands } from "../../cmds";
const axios = require("axios");
const Discord = module.require("discord.js");

export = {
  name: "va",
  aliases: ['slap'],
  description: "tán một ai đó",
  usage: 'nqg va <người dùng>',

  callback: async (client, message, args) => {
    axios.get("https://api.waifu.pics/sfw/slap").then((response: AxiosResponse) => {
      const member = message.mentions.members?.first();
      const data = response.data;

      const hug = data.url;

      if (!member) return message.reply("Cần để cập một người để ôm");
      let SlapEmbed = new Discord.EmbedBuilder()
        .setDescription(
          `<@${message.author.id}> Sao lại tự vả chính mình như z, để tui vả cậu nha <3`
        )
        .setImage()
        .setColor(0xf000ff);
      if (member.id === message.author.id)
        return message.channel.send({ embeds: [SlapEmbed] });
      let SlapEmbed2 = new Discord.EmbedBuilder()
        .setDescription(
          `**<@${message.author.id}> vả ${member}, ỏooo cute <3, Chết mẹ mày chưa <3**`
        )
        .setImage(hug)
        .setColor(0xf000ff);
      return message.channel.send({ embeds: [SlapEmbed2] });
    });
  },
} as const as PrefixCommands;
