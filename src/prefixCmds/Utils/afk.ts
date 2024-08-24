import { PrefixCommands } from "../../cmds";
import afkModel from "../../database/models/afkModel";

export default {
    name: "afk",
    description: "thông báo trạng thái afk",

    callback: async (client, message, args) => {
        const notification = args.join(' ') || "AFK";
        const afkData = await afkModel.findOne({ userId: message.author.id }) || new afkModel({ userId: message.author.id });

        afkData.notification = notification
        afkData.timeStarted = Date.now();
        
        await message.reply(`${message.author} rời khỏi cuộc chơi | Thông điệp: ${notification}`)
        
        await afkData.save();

    },
} as const as PrefixCommands;