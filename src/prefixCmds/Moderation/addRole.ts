import { PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import { PrefixCommands } from '../../cmds';

export = {
  name: "addrole",
  description: 'Add role cho một người',
  usage: 'addrole <người dùng hoặc ID> <role ID>',

  callback: async (client, message, args) => {
    if (!message.member || !message.member.permissions || !message.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return message.reply('Bạn không có quyền để sử dụng lệnh này.');
    }

    let member;
    const firstArg = args[0];

    if (!message.mentions.members || !message.guild) return;

    if (message.mentions.members.size > 0) {
      member = message.mentions.members.first();
    } else {
      // Use the correct variable here, firstArg instead of member.id
      member = message.guild.members.cache.find(m => m.id == firstArg);
    }

    const roleId = args[1];
    if (!member || !roleId) {
      return message.reply('Vui lòng đề cập đến một thành viên và cung cấp ID của role hợp lệ.');
    }

    const role = message.guild.roles.cache.get(roleId);
    if (!role) {
      return message.reply('Không tìm thấy role có ID như vậy trong máy chủ.');
    }

    let embed;
    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role.id);
      await message.reply(`Đã loại bỏ role ${role.name} cho ${member.user.tag}.`);
    } else {
      embed = new EmbedBuilder() // Changed EmbedBuilder to MessageEmbed
        .setColor("White") // Changed "White" to "WHITE"
        .setDescription(`Đã thêm role <@&${role.id}> cho <@${member.id}>`)
        .setTimestamp();
      await member.roles.add(role.id);
      await message.reply({ embeds: [embed] });
    }
  },
} as const as PrefixCommands;