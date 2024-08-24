import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { PrefixCommands } from "../../cmds";

export = {
    name: 'untimeout',
    description: 'Hủy timeout cho người dùng',
    usage: 'untimeout <người dùng>',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    callback: async (client, message, args) => {        if (!message.guild || !message.mentions.members || !message.member) return;

        const userTimeout = message.mentions.members.first() ||
        message.guild.members.cache.find((u) => u.id === args[0] || u.user.username === args[0]);

        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return message.reply('Bạn không có quyền hủy timeout cho người khác!');
        if (!userTimeout) return message.reply('Vui lòng đề cập 1 người để hủy timeout!')
        if (userTimeout.id === message.author.id) return message.reply('Bạn không thể hủy timeout cho chính mình!')  
        if (message.member.roles.highest.position < userTimeout.roles.highest.position) return message.reply('Tôi không thể hủy timeout cho người này');

        try { 
            // Hủy timeout cho người dùng
            userTimeout.timeout(null)
            const embed = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`<:9343untimeout:1129673777345744966> Đã hủy timeout cho người dùng ${userTimeout}`)
            await message.reply({ embeds: [embed]});

        
        } catch(err) {
            console.log("Lỗi: ", err)
        }
    }
} as const as PrefixCommands;