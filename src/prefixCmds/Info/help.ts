import { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from 'discord.js';
import path from 'path';
import { PrefixCommands } from '../../cmds';
import { getAllFiles } from '../../utils/functions';


export = {
     name: 'help',
     description: "xem tất cả lệnh mà em đang có",
     aliases: ['cuutoivoi', 'cuutoi', 'h'],
     showHelp: false,

     callback: async (client, message, args) => {
          const emoji = client.customEmoji.emoji;
          const emojiId = client.customEmoji.emojiId;

          const commandFolders = getAllFiles(path.join(__dirname, '..'), true)
               .map((value) => value.replace(/\\/g, '/').split("/").pop()!.split('.').shift()!);

          function createSelectMenuOption(categoryName: string[]) {
               const result = new Array<StringSelectMenuOptionBuilder>();
               for (const category of categoryName) {
                    const optionMenu = new StringSelectMenuOptionBuilder()
                         .setDescription(`Xem các lệnh về ${category}!`)
                         .setLabel(category)
                         .setValue(category)
                    if (emojiId?.[category as keyof object]) {
                         optionMenu.setEmoji(emojiId[category as keyof object])
                    }

                    result.push(optionMenu);
               }
               return result
          }

          const menu = new StringSelectMenuBuilder()
               .setCustomId('help')
               .setPlaceholder('⟩ Help menu')
               .setMinValues(1)
               .setMaxValues(3)
               .addOptions(createSelectMenuOption(commandFolders));
          const row1 = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu);

          const helpString = commandFolders.map((value) => {
               return `> ${emoji[value as keyof object]} \`:\` **${value}** `
          }).join("\n");
          const prefixData = await client.getPrefix(message.guildId!);
          const embed = new EmbedBuilder()
               .setColor('Fuchsia')
               .setAuthor({ name: "BẢNG LỆNH LOLI BOT" })
               .setTitle(`Prefix thay thế của máy chủ ${prefixData ? prefixData : 'Không có'}`)
               .setDescription(`Chào mừng ${message.author.toString()} đến với sở thú||LOLI||. \n Bot được phát triển bởi <@479182625764802560> và <@874321270437728257>`)
               .addFields([
                    {
                         name: `- Các loại lệnh của Bot \n `,
                         value: `${helpString} \n \nLove is War ● FanClub Isherry`,
                         inline: false
                    }
               ])
               .setTimestamp()
               .setFooter({ text: `Prefix của bot là ${configure.app.prefix}` });

          // client.components.set(message.author.id, menu.data.custom_id);

          await message.reply({ embeds: [embed], components: [row1] }).then((msg) => {
               setTimeout(() => msg.delete(), 60 * 10 * 100)
          });
     },
} as const as PrefixCommands;