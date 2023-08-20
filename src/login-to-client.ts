import { discordBotToken, discordClient } from "./application-info"

export default async function () {
  discordClient.login(await discordBotToken)
}
