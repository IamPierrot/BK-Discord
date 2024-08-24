import { PrefixCommands } from "../../cmds";
import { EmbedBuilder } from "discord.js";

export = {
  name: "chit",
  aliases: ["f"],
  description: "ch*t một ai đó",
  adminOnly: true,

  callback: async (client, message, args) => {
    return await message.reply("tính năng không bao giờ tồn tại :|");
    const member = message.mentions.members?.first();

    if (!member) return;

    if (member?.id === message.author.id) 
        return  message.reply('Chit chính mình làm gì, chit tui nè ૮꒰ྀི⸝⸝> . <⸝⸝꒱ྀིა');

    const chitEmbed = new EmbedBuilder()
        .setDescription(
        `**<@${message.author.id}>...${member}, (,,>﹏<,,) (,,>﹏<,,)**`
      )
      .setImage("https://cdn.discordapp.com/emojis/1114528189121835068.gif?size=100")
      .setColor(0xf000ff);

    message.channel.send({ embeds: [chitEmbed] });
  },
} as const as PrefixCommands
