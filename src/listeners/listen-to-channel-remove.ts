import { Events } from "discord.js"
import { discordClient } from "../application-info"
import { db } from "../database"
import { FieldValue } from "firebase-admin/firestore"

export default function () {
  discordClient.on(Events.ChannelDelete, (channel) => {
    if (channel.isDMBased()) return

    const settings = db.collection(`Bot/settings/${channel.guildId}`).doc("settings")

    settings
      .set(
        {
          enabledChannels: FieldValue.arrayRemove(channel.id),
        },
        { merge: true }
      )
      .catch((err) => {
        console.error(err)
      })
  })
}
