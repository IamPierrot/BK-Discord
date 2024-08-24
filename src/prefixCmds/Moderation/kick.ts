import { EmbedBuilder } from "discord.js";
import { PrefixCommands } from "../../cmds";

export = {
    name: 'kick',
    description: 'Kick một người dùng',
    usage: 'kick <người dùng>',
    callback: async (client, message, args) => {
        if (!message.guild || !message.mentions.members) return;

        const toKick = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!toKick) return message.reply('Vui lòng nhập 1 người để kick');
        if (toKick.id == message.author.id) return message.reply('Bạn không thể kick chính mình!');
        if (toKick.id === client.user?.id) return message.reply('Bạn không thể kick tôi ;-;');

        const reason = args.slice(1).join(' ');

        const kickUser = async () => {
            try {
                await toKick.kick(reason);
                const embedSuccess = new EmbedBuilder()
                    .setColor('Green')
                    .setDescription(`<a:canh_bao:1131124015818358835> Đã kick thành công ${toKick.user.tag}`);
                await message.reply({ embeds: [embedSuccess] });
            } catch (err) {
                await message.reply('Có lỗi khi kick!');
                console.error(err);
            }
        };

        if (configure.opt.idDev.includes(message.author.id) || message.member?.permissions.has('KickMembers')) {
            await kickUser();
        } else {
            return message.reply('Bạn không có quyền kick người khác!');
        }
    },
} as const as PrefixCommands;
