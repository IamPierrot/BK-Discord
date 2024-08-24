import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { SlashCommands } from "../../cmds";
export = {
    name: "addsticker",
    description: "add a sticker to your channel!",
    options: [
        {
            name: "name",
            description: "The name of the sticker",
            required: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: "description",
            description: "A brief description of the sticker",
            required: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: "tags",
            description: "Tags associated with the sticker, separated by commas",
            required: false,
            type: ApplicationCommandOptionType.String
        }
    ],
    callback: async (client, interaction) => {
        if (!interaction.memberPermissions?.has('ManageEmojisAndStickers'))
            return interaction.followUp({ content: "You do not have enough permissions to use this command." });

        const name = interaction.options.getString('name');
        const description = interaction.options.getString('description');
        const tags = interaction.options.getString('tags');

        if (!name || !description || !tags) {
            return await interaction.editReply("Bạn chưa điền đủ thông tin (tên, mô tả, tags)!");
        }

        await interaction.followUp("Vui lòng gửi URL/File của ảnh mà bạn muốn dùng làm sticker.");

        const filter = (response: any) => response.author.id === interaction.user.id;
        const collector = interaction.channel?.createMessageCollector({ filter, max: 1, time: 60000 });

        collector?.on('collect', async (message) => {
            const stickerUrl = message.content.trim();

            try {
                /* Create sticker and send embed */
                const sticker = await interaction.guild?.stickers.create({
                    file: stickerUrl,
                    name: name,
                    description: description,
                    tags: tags
                });

                const embed = new EmbedBuilder()
                    .setTitle("Sticker Added ✅")
                    .setDescription(`Added new sticker **\`${sticker?.name}\`**`)
                    .setColor("Green");

                return interaction.followUp({ embeds: [embed] });
            } catch (err) {
                return interaction.followUp(`😅 | Unable to add sticker. \n \`\`\`\n ${err}\`\`\``);
            }
        });

        collector?.on('end', (collected, reason) => {
            if (reason === 'time') {
                interaction.followUp("Thời gian đã hết, bạn không cung cấp URL nào.");
            }
        });
    },
} as const as SlashCommands;