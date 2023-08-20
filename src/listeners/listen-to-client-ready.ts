import { Events } from "discord.js"
import { discordClient } from "../application-info"

export default function () {
  discordClient.on(Events.ClientReady, () => {
    console.log("Ready!")
  })
}
