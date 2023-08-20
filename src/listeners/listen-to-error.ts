import { Events } from "discord.js"
import { discordClient } from "../application-info"

export default function () {
  discordClient.on(Events.Error, (error) => {
    console.error(error)
  })
}
