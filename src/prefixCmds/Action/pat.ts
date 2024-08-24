import { AxiosResponse } from "axios";
import { PrefixCommands } from "../../cmds";

const Discord = require("discord.js");
const axios = require("axios");

export = {
  name: "xoadau",
  aliases: ['pat'],
  description: "Xoa đầu một ai đó",
  usage: 'nqg xoadau <người dùng>',

  callback: async (client, message, args) => {
    axios.get("https://api.waifu.pics/sfw/pat").then((response: AxiosResponse) => {
      const member = message.mentions.members?.first();
      const data = response.data;

      const pat = data.url;

      if (!member) return message.reply("Cần để cập một người để xoa đầu");
      if (member.id === message.author.id) {
        return message.channel.send("**Đây đây tôi xoa đầu cho bạn cho...**")
      }
    
      let KissEmbed = new Discord.EmbedBuilder()
        .setDescription(
          `**<@${message.author.id}> xoa đầu ${member}, ỏooo cute <3, ỏooo cute <3**`
        )
        .setImage(pat)
        .setColor(0xf000ff);
      return message.channel.send({ embeds: [KissEmbed] });
    });
  },
} as const as PrefixCommands;
