import { REST, Routes } from "discord.js"
import * as dotenv from "dotenv"
import commands from "./commands"

dotenv.config()

const clientId = process.env.CLIENT_ID
const token = process.env.TOKEN

export default async function () {
  if (!clientId) throw new Error("No client ID found!")
  if (!token) throw new Error("No token found!")

  const commandsJson = Array.from((await commands).values()).map((command) => command.data.toJSON())

  const rest = new REST().setToken(token)

  console.log("Refreshing application (/) commands…")

  rest
    .put(Routes.applicationCommands(clientId), { body: commandsJson })
    .then(() => console.log("Successfully reloaded application (/) commands."))
    .catch(console.error)
}
