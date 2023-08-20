import { Events } from "discord.js"
import commands from "../commands"
import { discordClient } from "../application-info"

export default function () {
  discordClient.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const command = (await commands).get(interaction.commandName)

    if (!command) {
      console.warn(`Command "${interaction.commandName}" not found.`)
      return
    }

    command.execute(interaction).catch((error) => {
      console.error(error)
      if (interaction.replied || interaction.deferred) {
        interaction.followUp({ content: "There was an error while executing this command!" })
      } else {
        interaction.reply({ content: "There was an error while executing this command!" })
      }
    })
  })
}
