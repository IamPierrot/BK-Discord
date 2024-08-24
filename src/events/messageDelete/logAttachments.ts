import { Message, TextChannel, AttachmentBuilder } from "discord.js";
import { LoliBotClient } from "../../utils/clients";
import { getAttachmentPath, deleteAttachment } from "../../utils/attachmentStore";
import fs from "fs";

const logChannelId = "1265519300647714917";

export = async (client: LoliBotClient, message: Message) => {
    try {
        if (message.author.bot) return;
        const logMessage = `Bởi: <@${message.author.id}>\nTrong kênh: <#${message.channel.id}>\nNội dung: ${message.content}\n`;

        if (message.attachments.size > 0) {
            const attachment = message.attachments.first();
            let attachmentPath;

            if (attachment)
                attachmentPath = getAttachmentPath(message.id, attachment.contentType!);

            const logChannel = client.channels.cache.get(logChannelId) as TextChannel;

            if (logChannel && logChannel instanceof TextChannel) {
                if (attachmentPath && fs.existsSync(attachmentPath)) {
                    const attachmentFile = new AttachmentBuilder(attachmentPath);
                    await logChannel.send({ content: logMessage, files: [attachmentFile], allowedMentions: { parse: [] } });
                }
            }

            if (attachment) {
                deleteAttachment(message.id, attachment.contentType!);
            }
        }
    } catch (e) {
        console.log("Lỗi ghi log ảnh-vid: ", e);
    }
}