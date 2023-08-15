import { Client, Events } from "discord.js"
import * as dotenv from "dotenv"
import listenOnCommand from "./listeners/listenOnCommand"
import registerCommands from "./registerCommands"

dotenv.config()

const botToken = process.env.BOT_TOKEN

if (!botToken) throw new Error("No token found!")

const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
})

client.on(Events.ClientReady, () => {
  console.log("Ready!")
})

listenOnCommand(client)
registerCommands()

client.on(Events.Error, (error) => {
  console.error(error)
})

client.login(botToken)
