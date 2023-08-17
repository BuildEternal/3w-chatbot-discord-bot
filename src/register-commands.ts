import { REST, Routes } from "discord.js"
import commands from "./commands"
import { discordBotToken, discordApplicationId } from "./application-info"

export default async function () {
  const commandsJson = Array.from((await commands).values()).map((command) => command.data.toJSON())

  const rest = new REST().setToken(await discordBotToken)

  console.log("Refreshing application (/) commands…")

  rest
    .put(Routes.applicationCommands(discordApplicationId), { body: commandsJson })
    .then(() => console.log("Successfully reloaded application (/) commands."))
    .catch(console.error)
}
