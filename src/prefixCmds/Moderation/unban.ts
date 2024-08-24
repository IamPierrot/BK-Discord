import { EmbedBuilder } from "discord.js";
import { PrefixCommands } from "../../cmds";

export = {
  name: "unban",
  description: "Unban một người dùng",
  usage: "nqg unban <người dùng>",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {*} args
   * @returns
   */
  callback: async (client, message, args) => {    const toBanID = args[0];
    if (!toBanID)
      return message.reply("Vui lòng cung cấp ID của người cần unban");
    if (toBanID == message.author.id) return;
    if (toBanID === client.user?.id) return;
    if (configure.opt.idDev.includes(message.author.id)) {
      try {
        if (!message.guild) return;

        const bannedUsers = await message.guild.bans.fetch();
  
        // Kiểm tra xem người dùng có tồn tại trong danh sách cấm hay không
        if (!bannedUsers) {
          return
        }
          await message.guild.members.unban(toBanID)
        const embedSuccess = new EmbedBuilder()
          .setColor("Green")
          .setDescription(`Đã unban thành công ID: ${toBanID}`);
        message.reply({ embeds: [embedSuccess] });
      } catch (err) {
        await message.reply(`ID người dùng này không tồn tại trong danh sách cấm của máy chủ!`).then(msg => {
          setTimeout(() => {
              msg.delete()
          }, 5000)
        });
        console.error(err);
      }
    }
    else if (!message.member?.permissions.has("BanMembers")) {
      return message.reply("Bạn không có quyền dùng lệnh này!");
    }

    else {
      try {
        const bannedUsers = await message.guild?.bans.fetch();
  
        // Kiểm tra xem người dùng có tồn tại trong danh sách cấm hay không
        if (!bannedUsers) {
          return
        }
          await message.guild?.members.unban(toBanID)
        const embedSuccess = new EmbedBuilder()
          .setColor("Green")
          .setDescription(`Đã unban thành công ID: ${toBanID}`);
        message.reply({ embeds: [embedSuccess] });
      } catch (err) {
        await message.reply(`ID người dùng này không tồn tại trong danh sách cấm của máy chủ!`).then(msg => {
          setTimeout(() => {
              msg.delete()
          }, 5000)
        });
        console.error(err);
      }
    }
  },
} as const as PrefixCommands;