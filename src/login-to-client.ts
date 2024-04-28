import { discordBotToken, discordClient } from "./application-info"

export default async function () {
  return await discordClient.login(await discordBotToken)
}
