import { AxiosResponse } from "axios";
import { PrefixCommands } from "../../cmds";
import { EmbedBuilder } from "discord.js";

const axios = require("axios");

export = {
  name: "dap",
  aliases: ['bonk'],
  description: "đập một ai đó",
  usage: 'nqg dap <người dùng>',

  callback: async (client, message, args) => {
    axios.get("https://api.waifu.pics/sfw/bonk").then((response: AxiosResponse) => {
      var member = message.mentions.members?.first();
      const data = response.data;

      const hug = data.url;

      if (!member) return message.reply("Cần để cập một người để bonk");
      const BonkEmbed = new EmbedBuilder()
        .setDescription(
          `<@${message.author.id}> Sao lại tự đập chính mình như z, để tui đập cậu hộ nha <3`
        )
        .setColor(0xf000ff);
      if (member.id === message.author.id)
        return message.channel.send({ embeds: [BonkEmbed] });
      const BonkEmbed2 = new EmbedBuilder()
        .setDescription(
          `**<@${message.author.id}> bonk ${member}, gõ cái đầu**`
        )
        .setImage(hug)
        .setColor(0xf000ff);
      return message.channel.send({ embeds: [BonkEmbed2] });
    });
  },
} as const as PrefixCommands
