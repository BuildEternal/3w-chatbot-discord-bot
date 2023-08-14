import { Client, Events } from "discord.js"
import commands from "../commands"

export default async function (client: Client) {
  const commandsCollection = await commands

  client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const command = commandsCollection.get(interaction.commandName)

    if (!command) {
      console.warn(`Command "${interaction.commandName}" not found.`)
      return
    }

    command.execute(interaction).catch((error) => {
      console.error(error)
      if (interaction.replied || interaction.deferred) {
        interaction.followUp({ content: "There was an error while executing this command!"})
      } else {
        interaction.reply({ content: "There was an error while executing this command!"})
      }
    })
  })
}
