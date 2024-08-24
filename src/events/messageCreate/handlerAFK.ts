import { Message } from "discord.js";
import { LoliBotClient } from "../../utils/clients";
import afkModel from "../../database/models/afkModel";
import { duration } from "moment";

export = async (client: LoliBotClient, message: Message) => {
    try {
        if (message.author.bot) return;
        await Promise.all([
            (async () => {
                const mention = message.mentions.members?.first();
                const afkData = await afkModel.findOne({ userId: mention?.user.id });
                if (!afkData) return;
                const timeAfk = duration(Date.now() - afkData.timeStarted).format(" D [ngày], H [giờ], m [phút], s [giây]");
                await message.reply(`${mention?.user} đã rời được ${timeAfk} và để lại lời nhắn - ${afkData.notification}`).then(msg => setTimeout(() => msg.delete(), 10000))
            })(),
            (async () => {
                const userAfkData = await afkModel.findOne({ userId: message.author.id });
                if (!userAfkData) return;

                await message.channel.send(`Ckao\` em iu ${message.author} đã quay trở lại~`).then(msg => setTimeout(() => msg.delete(), 10000));
                await userAfkData.deleteOne();
            })()
        ])
    } catch (error) {
        console.log('There was an error when handle AFK: ', error);
    }
}