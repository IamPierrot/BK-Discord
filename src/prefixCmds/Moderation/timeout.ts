import { Client, Message, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import ems from "enhanced-ms";

export = {
    name: 'timeout',
    description: 'Timeout người dùng',
    usage: 'timeout <người dùng> <thời gian>',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client: Client, message: Message, args: string[]) => {
        const userTimeout = message.mentions.members?.first() ||
        message.guild?.members.cache.find((u) => u.id === args[0] || u.user.username === args[0]);
        if (!userTimeout) return message.reply('Vui lòng đề cập 1 người để timeout!');
        const reason = args.slice(2).join(" ").trim() || 'Không có lý do';
        const timeString = args[1];
        const timeMs = ems(timeString);

        if (timeMs === null) return message.reply('Vui lòng nhập thời gian hợp lệ! Ví dụ: 1d/1h/1m/1s');
        
        if (configure.opt.idDev.includes(message.author.id)) {
            // if (message.member.roles.highest.position < userTimeout.roles.highest.position) {
                //     return message.reply('Tôi không thể timeout người này');
                // }
    
            if (timeMs > ems('1w')!) {
                return message.reply('Thời gian timeout lớn hơn 1 tuần. Không thể timeout người dùng trong thời gian quá dài.');
            }

            try {
                // Thực hiện timeout người dùng
                userTimeout.timeout(timeMs, reason);
    
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`<:4688timeout:1129673760102961182> Đã timeout người dùng ${userTimeout}
                    
                        > Thời gian ${timeString}
                        
                        > Lý do: ${reason}`)
                    .setTimestamp();
                await message.reply({ embeds: [embed]});
    
            } catch (err) {
                console.log("Lỗi: ", err);
            }
        } 

        else if (!message.member?.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            return message.reply('Bạn không có quyền timeout người khác!');
        }

        else {
            if (userTimeout.id === message.author.id) return message.reply('Bạn không thể timeout chính mình!');
    
            if (timeMs > ems('1w')!) {
                return message.reply('Thời gian timeout lớn hơn 1 tuần. Không thể timeout người dùng trong thời gian quá dài.');
            }
    
            if (message.member.roles.highest.position < userTimeout.roles.highest.position) {
                return message.reply('Tôi không thể timeout người này');
            }
    
            try {
                // Thực hiện timeout người dùng
                userTimeout.timeout(timeMs, reason);
    
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`<:4688timeout:1129673760102961182> Đã timeout người dùng ${userTimeout}
                    
                        > Thời gian ${timeString}
                        
                        > Lý do: ${reason}`)
                    .setTimestamp();
                await message.reply({ embeds: [embed]});
    
            } catch (err) {
                console.log("Lỗi: ", err);
            }
        }
    }
};