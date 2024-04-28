import { Events } from "discord.js"
import { discordClient } from "../application-info"
import { db } from "../database"
import ServerSettings from "../classes/server-settings"
import { sendChatbotQuery } from "../chatbot"

export default function () {
  discordClient.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return

    const guildId = message.guildId
    if (!guildId) return

    const channelId = message.channelId
    if (!channelId) return

    const pinged = message.mentions.users.has(discordClient.user!.id)

    try {
      const settings = new ServerSettings((await db.collection(`Bot/settings/${guildId}`).doc("settings").get()).data())
      if (!settings.enabledChannels.includes(channelId)) return

      await message.channel.sendTyping()

      await message.reply({
        content: (await sendChatbotQuery(message.author.id, message.content)) ?? "Failed to process inquiry.",
        allowedMentions: {
          repliedUser: false,
        },
      })
    } catch (error) {
      console.error(error)
    }
  })
}
