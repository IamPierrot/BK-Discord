import { EmbedBuilder, Message } from "discord.js";
import { LoliBotClient } from "../../utils/clients";
import geminiChannelModel from "../../database/models/geminiChannelModel";
import { ChatSession, GoogleGenerativeAIResponseError } from "@google/generative-ai";

const ChatSessionMap = new Map<string, ChatSession>();
const generationConfig = {
    temperature: 0.95,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};
export = async (client: LoliBotClient, message: Message) => {
    if (message.author.bot) return; 
    try {
        const geminiChannelData = await geminiChannelModel.findOne({ userId: message.author.id, guildId: message.guildId });
        if (!geminiChannelData) return;
        if (!geminiChannelData.AIChannel.some(channel => channel.id === message.channelId)) {
            if (ChatSessionMap.has(message.channelId)) {
                ChatSessionMap.delete(message.channelId);
                return await message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Bạn đã hết thời gian trò chuyện với tôi")
                            .setDescription("Hãy tạo lại cái mới!")
                    ]
                });
            }
            return;
        }
        await message.channel.sendTyping();
        const prompt = message.content;
        let session = ChatSessionMap.get(message.channelId);
        if (!session) {
            session = client.gemini.startChat({ generationConfig, history: [] });
            ChatSessionMap.set(message.channelId, session);
        }

        const result = await session.sendMessage(prompt);
        const responseText = result.response.text();
        const messages = [responseText.slice(0, 2000)];
        if (responseText.length >= 2000) messages.push(responseText.slice(2000, 4000));
        messages.push(message.author.toString());
        await Promise.all(messages.map(msg => message.channel.send(msg)));
    } catch (error) {
        if (error instanceof GoogleGenerativeAIResponseError) {
            await message.reply("Mày đã vi phạm tiêu chuẩn cộng đồng");
            setTimeout(() => message.delete(), 5000);
        }
    }
};
