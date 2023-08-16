import { Events } from "discord.js"
import listenOnCommand from "./listeners/listenOnCommand"
import registerCommands from "./registerCommands"
import { discordBotToken, discordClient } from "./applicationInfo"

;(async () => {
  discordClient.on(Events.ClientReady, () => {
    console.log("Ready!")
  })

  listenOnCommand()
  registerCommands()

  discordClient.on(Events.Error, (error) => {
    console.error(error)
  })

  discordClient.login(await discordBotToken)
})()
