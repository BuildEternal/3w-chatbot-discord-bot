import { REST, Routes } from "discord.js"
import commands from "./commands"
import { discordBotToken, discordApplicationId } from "./application-info"

export default async function () {
  const commandsJson = Array.from(commands.values()).map((command) => command.data.toJSON())

  const rest = new REST().setToken(await discordBotToken)

  console.log("Refreshing application (/) commands…")

  try {
    await rest.put(Routes.applicationCommands(discordApplicationId), { body: commandsJson })

    console.log("Successfully reloaded application (/) commands.")
  } catch (error) {
    console.error(error)
  }
}
