import { EmbedBuilder } from "discord.js";
import { PrefixCommands } from "../../cmds";

export = {
    name: 'ban',
    description: 'Ban một người dùng',
    usage: 'ban <người dùng>',
    callback: async (client, message, args) => {
        if (!message.guild || !message.mentions.members || !client.user) return;

        const toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(' ');

        if (!toBan) {
            return message.reply('Vui lòng nhập 1 người để ban');
        }

        if (reason.length === 0) {
            return message.reply("Vui lòng nhập lý do ban");
        }

        if (toBan.id == message.author.id) {
            return message.reply('Bạn không thể ban chính mình!');
        }

        if (toBan.id === client.user.id) {
            return message.reply('Bạn không thể ban tôi ;-;');
        }

        const banUser = async () => {
            try {
                await toBan.ban({ reason });
                const embedSuccess = new EmbedBuilder()
                    .setColor('Green')
                    .setDescription(`<a:ban:1131226761594675210> Đã ban thành công ${toBan.user.tag}`);
                await message.reply({ embeds: [embedSuccess] });

                const notiEmbed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`
                        > Bạn đã bị ban khỏi server **${message.guildId}**
                        
                        > Lý do: ${reason}
                    `)
                    .setTimestamp();

                await toBan.send({ embeds: [notiEmbed] });
            } catch (err) {
                await message.reply('Có lỗi khi ban!');
                console.error(err);
            }
        };

        if (configure.opt.idDev.includes(message.author.id) || message.member?.permissions.has('BanMembers')) {
            await banUser();
        } else {
            return message.reply('Bạn không có quyền ban người khác!');
        }
    },
} as const as PrefixCommands;
