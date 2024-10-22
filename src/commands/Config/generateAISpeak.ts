import { CategoryChannel, ChannelType, EmbedBuilder, OverwriteResolvable } from "discord.js";
import { SlashCommands } from "../../cmds";
import geminiChannelModel from "../../database/models/geminiChannelModel";

export = {
     name: "geminispeak",
     description: "creating a channel for interacting with gemini",
     options: [],
     deleted: false,
     callback: async (client, interaction) => {
          const geminiChannelData = await geminiChannelModel.findOne({
               userId: interaction.user.id,
               guildId: interaction.guildId
          }) || new geminiChannelModel({
               userId: interaction.user.id,
               guildId: interaction.guildId
          });
          if (geminiChannelData.AIChannel.length > 2) return await interaction.editReply({
               embeds: [
                    new EmbedBuilder()
                         .setTitle("Bạn đã tạo quá số lượng kênh chat với gemini")
                         .setDescription('Chỉ được tối đa tạo ra `2` channel chat với gemini')
                         .setColor('Red')
               ]
          });
          
          try {
               const categoryName = "GEMINI";
               const existingCategory = interaction.guild?.channels.cache.find(c => c.name === categoryName && c.type === ChannelType.GuildCategory) as CategoryChannel | undefined;
               let channel;
               if (!existingCategory) {
                    // Nếu danh mục chưa tồn tại, tạo danh mục mới
                    const newCategory = await interaction.guild?.channels.create({
                         name: categoryName,
                         type: ChannelType.GuildCategory,
                    });

                    // Gán danh mục mới cho channel
                    channel = await interaction.guild?.channels.create({
                         name: `Gemini #${geminiChannelData.AIChannel.length + 1}`,
                         type: ChannelType.GuildText,
                         parent: newCategory,
                         rateLimitPerUser: 5000,
                         permissionOverwrites: [
                              {
                                   id: interaction.guild.id, // Deny access to everyone in the guild
                                   deny: "ViewChannel",
                              },
                              {
                                   id: interaction.user.id, // Allow access only to the user
                                   allow: "ViewChannel",
                              },
                              {
                                   id: client.user?.id, // Allow access only to the user
                                   allow: "ViewChannel",
                              },
                         ] as OverwriteResolvable[],
                    });
               } else {
                    // Nếu danh mục đã tồn tại, tạo channel trong danh mục đó
                    channel = await interaction.guild?.channels.create({
                         name: `Gemini #${geminiChannelData.AIChannel.length + 1}`,
                         type: ChannelType.GuildText,
                         parent: existingCategory,
                         rateLimitPerUser: 5000,
                         permissionOverwrites: [
                              {
                                   id: interaction.guild.id, // Deny access to everyone in the guild
                                   deny: "ViewChannel",
                              },
                              {
                                   id: interaction.user.id, // Allow access only to the user
                                   allow: "ViewChannel",
                              },
                              {
                                   id: client.user?.id, // Allow access only to the user
                                   allow: "ViewChannel",
                              },
                         ] as OverwriteResolvable[],
                    });
               }

               if (!channel) throw Error();
               geminiChannelData.AIChannel.push({ id: channel.id, expired: Date.now() + (30 * 60 * 1000) });
               await geminiChannelData.save()
               await Promise.all([
                    await channel.send(`Ckao\` ${interaction.user.toString()}`),
                    await channel.send(`Cậu chỉ có 30 phút ở với mìnk thoai đoá, lo làm gì đi ( ͡° ͜ʖ ͡°)`),
                    await interaction.editReply(`Đã tạo cuộc trò chuyện tại ${channel.toString()}`),
               ]);
          } catch (err) {
               await interaction.editReply({
                    embeds: [
                         new EmbedBuilder()
                              .setTitle("Có lỗi khi tạo channel!")
                              .setColor('Red')]
               });
               console.log(err);
          }

     },
} as const as SlashCommands;