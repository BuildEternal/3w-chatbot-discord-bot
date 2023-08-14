import { SlashCommandBuilder } from "discord.js"
import { Command } from "../types/Command"

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("oculusping")
    .setDescription("Replies with pong!"),
  execute: async (interaction) => {
    await interaction.reply("Pong!")
  },
}

export default command
