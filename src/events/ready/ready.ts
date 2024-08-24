import { ActivityOptions, ActivityType, TextChannel } from "discord.js";
import { LoliBotClient } from "../../utils/clients";
import chalk from "chalk";
import geminiChannelModel from "../../database/models/geminiChannelModel";

const status: ActivityOptions[] = [
     {
          name: 'em iu bê ka',
          type: ActivityType.Streaming,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
     },
     {
          name: 'Fan Bê ka',
          type: ActivityType.Streaming,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
     },
     {
          name: 'Bê ka là số 1',
          type: ActivityType.Streaming,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
     },
]

export = async (client: LoliBotClient) => {

     if (!client.user) throw new Error('Cook');

     // handle invites
     await Promise.all(client.guilds.cache.map(async guild => {
          if (guild.id !== client.localGuild) return;

          const [invites, vanityData] = await Promise.all([
               guild.invites.fetch(),
               guild.fetchVanityData().catch(() => null)
          ]);

          client.savedInvites.set(guild.id, invites);

          if (vanityData) {
               client.savedVanityUses.set(guild.id, vanityData.uses);
          }
     }));

     client.on('inviteCreate', async invite => {
          if (invite.guild?.id !== client.localGuild) return;
          client.savedInvites.get(invite.guild.id)?.set(invite.code, invite);
     });
     client.on('inviteDelete', async invite => {
          if (invite.guild?.id !== client.localGuild) return;
          client.savedInvites.get(invite.guild?.id)?.delete(invite.code);
     });
     /////////////////////////////

     setInterval(() => {
          const random = Math.floor(Math.random() * status.length);
          client.user!.setActivity(status[random]);
     }, 10000)

     console.log(chalk.green.bold(`✅ Sucessfully logged into ${chalk.bold.magenta(client.user.tag)}`));
     const allGeminiChannelData = await geminiChannelModel.find();

     const checkAndDeleteExpiredChannels = async () => {
          const currentTime = Date.now();
          const deletionPromises: Promise<any>[] = [];
          const channelsToDelete: string[] = [];

          for (const geminiChannelData of allGeminiChannelData) {
               for (const dbChannel of geminiChannelData.AIChannel) {
                    if (dbChannel.expired < currentTime) {
                         // Collect all deletion promises
                         const deletionPromise = client.channels.fetch(dbChannel.id)
                              .then(channelToDelete => {
                                   if (channelToDelete && channelToDelete instanceof TextChannel) {
                                        return channelToDelete.send("Cuộc vui của ta kết thúc tại đây. Hẹn gặp lại lần sau :3")
                                             .then(() => setTimeout(() => channelToDelete.delete(), 2 * 60 * 1000));
                                   }
                              })
                              .catch(error => {
                                   console.error(`Failed to delete channel: ${dbChannel.id}`, error);
                              });
                         deletionPromises.push(deletionPromise);
                         channelsToDelete.push(dbChannel.id);
                    }
               }

               // Filter out the deleted channels
               geminiChannelData.AIChannel = geminiChannelData.AIChannel.filter(dbChannel => !channelsToDelete.includes(dbChannel.id));
          }

          // Await all deletion promises concurrently
          await Promise.all(deletionPromises);

          // Save changes to the database in one go
          await Promise.all(allGeminiChannelData.map(data => data.save()));
     };

     setInterval(checkAndDeleteExpiredChannels, 60 * 1000);
}