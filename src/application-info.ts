import { SecretManagerServiceClient } from "@google-cloud/secret-manager"
import { Client } from "discord.js"

const secretManagerServiceClient = new SecretManagerServiceClient()

export const discordApplicationId = "1140443348159696987"

export const projectId = "d3w-chatbot-ehvu"

export const discordBotToken = secretManagerServiceClient
  .accessSecretVersion({
    name: `projects/${projectId}/secrets/BOT_TOKEN/versions/latest`,
  })
  .then(([version]) => version.payload?.data?.toString())
  .then((data) => {
    if (!data) {
      throw new Error("No data found in secret.")
    }
    return data
  })
  .catch((err) => {
    console.error(err)
    throw new Error("Error retrieving bot token from Secret Manager.")
  })
  
export const discordClient = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
})
