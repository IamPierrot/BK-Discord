import { AttachmentBuilder, EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import { LoliBotClient } from "../../utils/clients";
import path from "path";

// const newbieRoleId = "1262607566974881884";
// const botRoleId = "1262699369287909396";
// const logChannelId = "1262700568422514718";
const welcomeChannelId = "1276794830382432324";

export = async (client: LoliBotClient, member: GuildMember) => {
     if (member.guild.id !== client.localGuild) return;

     // const roleBot = member.guild.roles.cache.get(botRoleId)!;
     // const roleMember = member.guild.roles.cache.get(newbieRoleId)!;
     // const logChannel = client.guilds.cache.get(client.localGuild)?.channels.cache.get(logChannelId) as TextChannel;
     const welcomeChannel = client.guilds.cache.get(client.localGuild)?.channels.cache.get(welcomeChannelId) as TextChannel;

     const welcomeImg = new AttachmentBuilder(path.join(__dirname, "..", "..", "assets", "welcome.gif"));

     const welcomeEmbed = new EmbedBuilder()
          .setTitle("chào mừng bạn đã tham gia vào fanclub BK".toUpperCase())
          .setDescription(`Hãy tận hưởng và hoà đồng với mọi người`)
          .setImage("attachment://welcome.gif")
     await welcomeChannel.send({ content: `Chào bạn ${member.user}`, embeds: [welcomeEmbed], files: [welcomeImg] });

     // const addRoleEmbed = new EmbedBuilder().setAuthor({ name: "Add role thành công!" }).setColor("Gold");
     // if (member.user.bot) {

     //      if (member.roles.cache.get(roleBot.id)) return;
     //      await member.roles.add(roleBot).then(() => {
     //           logChannel.send({
     //                embeds: [
     //                     addRoleEmbed.setDescription(`${member.user.toString()} đã được add thành công role ${roleBot}`)
     //                ]
     //           })
     //      }).catch(err => logChannel?.send({
     //           embeds: [
     //                addRoleEmbed.setColor('Red').setAuthor({ name: "Có lỗi khi add role." }).setDescription(`\`\`\` \n ${err} \`\`\``)]
     //      }));
     // } else {
     //      if (member.roles.cache.get(roleMember.id)) return;
     //      await member.roles.add(roleMember).then(() => {
     //           logChannel?.send({
     //                embeds: [
     //                     addRoleEmbed.setDescription(`${member.user.toString()} đã được add thành công role ${roleMember}`)
     //                ]
     //           })
     //      }).catch(err => logChannel.send({
     //           embeds: [
     //                addRoleEmbed.setColor('Red').setAuthor({ name: "Có lỗi khi add role." }).setDescription(`\`\`\` \n ${err} \`\`\``)]
     //      }));
     // }
}