import { GuildMember } from "discord.js";
import { LoliBotClient } from "../../utils/clients";

// const logChannelId = "1262700568422514718";

export = async (client: LoliBotClient, member: GuildMember) => {
    return;
    // if (member.guild.id !== client.localGuild) return;

    // const logChannel = client.guilds.cache.get(client.localGuild)?.channels.cache.get(logChannelId) as TextChannel;

    // const guild = member.guild;
    // const newInvites = await guild.invites.fetch();
    // const oldInvites = client.savedInvites.get(guild.id);

    // if (!oldInvites) return;
    // const invite = newInvites.find((i) => i.uses! > oldInvites.get(i.code)?.uses!);

    // let vanityInvite: { code: string | null; uses: number } | null = null;
    // if (!invite) {
    //     const vanityData = await guild.fetchVanityData().catch(() => null);
    //     if (vanityData && (vanityData.uses > (client.savedVanityUses.get(guild.id) ?? 0))) {
    //         vanityInvite = {
    //             code: guild.vanityURLCode,
    //             uses: vanityData.uses,
    //         };
    //         client.savedVanityUses.set(guild.id, vanityData.uses);
    //     }
    // }
    // let logInvite = "";
    // if (invite) {
    //     logInvite = `${member.user.tag} | Đã tham gia vào server với link https://discord.gg/${invite.code} của ${invite.inviter?.tag}`;
    // } else if (vanityInvite) {
    //     logInvite = `${member.user.tag} | Đã tham gia vào server với Vanity Link https://discord.gg/${vanityInvite.code}`;
    // } else {
    //     logInvite = `${member.user.tag} | Đã tham gia server không thông qua link nào!`;
    // }
    // client.savedInvites.set(guild.id, newInvites);

    // await logChannel.send(logInvite);
}
