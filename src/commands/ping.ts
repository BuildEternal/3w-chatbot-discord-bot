import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js"
import Command from "../classes/command"

export default new Command(
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Confirms that this client is successfully interfaced with the Oculus database.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async (interaction) => {
    await interaction.reply("Interface confirmed.")
  }
)
