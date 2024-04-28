import { Events } from "discord.js"
import commands from "../commands"
import { discordClient } from "../application-info"

export default function () {
  discordClient.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const command = commands.get(interaction.commandName)

    if (!command) {
      console.warn(`Command "${interaction.commandName}" not found.`)
      return
    }

    command.execute(interaction).catch(async (error) => {
      console.error(error)
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: "There was an error while executing this command!" })
      } else {
        await interaction.reply({ content: "There was an error while executing this command!" })
      }
    })
  })
}
