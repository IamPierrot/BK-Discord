import prefixModel from '../../database/models/prefixModel';
import { PrefixCommands } from '../../cmds';

export = {
     name: "changeprefix",
     aliases: ["cp"],
     description: 'thay đổi prefix cho máy chủ hiện tại',
     adminOnly: true,

     callback: async (client, message, args) => {
          const newPrefix = args[0];
          const data = await prefixModel.findOne({ guildId: message.guildId }) || new prefixModel({ prefix: newPrefix, guildId: message.guildId });
          const oldPrefix = data.prefix;
          data.prefix = newPrefix;
          await data.save();

          await message.reply(`Đã thay đổi prefix cho máy chủ hiện tại từ \`${oldPrefix}\` thành \`${newPrefix}\``);

     }
} as const as PrefixCommands;