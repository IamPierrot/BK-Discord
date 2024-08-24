import { EmbedBuilder } from "discord.js";
import { PrefixCommands } from "../../cmds";

export default {
    name: "avatar",
    description: "xem avatar của member khác",
    aliases: ["avt", "av"],

    callback: async (client, message, args) => {
        const toUser = message.mentions.members?.first() || message.guild?.members.cache.find((u) => u.id === args[0] || u.user.username === args[0]) || message.member;

        const url = toUser?.displayAvatarURL({
            size: 4096,
            extension: "png" || "jpg" || "gif" || "webp" || "jpeg"
        })

        if (!url) return await message.reply("Không tìm thấy!");

        const avatarEmbed = new EmbedBuilder()
            .setAuthor({ name: `Avatar của ${toUser?.displayName}`, iconURL: client.user?.displayAvatarURL() })
            .setImage(url)
            .setFooter({ text: "From Isherry with 💞" })
            .setTimestamp();

        await message.reply({ embeds: [avatarEmbed] });
    },
} as const as PrefixCommands;