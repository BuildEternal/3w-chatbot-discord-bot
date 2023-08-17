import { Events } from "discord.js"
import listenOnCommand from "./listeners/listen-on-command"
import registerCommands from "./register-commands"
import { discordBotToken, discordClient } from "./application-info"

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
