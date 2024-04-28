import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js"
import Command from "../classes/command"
import { cacheManager, db } from "../database"
import { FieldValue } from "firebase-admin/firestore"
import ServerSettings from "../classes/server-settings"

export default new Command(
  new SlashCommandBuilder()
    .setName("channel")
    .setDescription("Manages the channels that the Oculus database is enabled in.")
    .addSubcommand((subcommand) =>
      subcommand.setName("enable").setDescription("Enables the Oculus database in this channel.")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("disable").setDescription("Disables the Oculus database in this channel.")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("list").setDescription("Lists the channels that the Oculus database is enabled in.")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async (interaction) => {
    const subcommand = interaction.options.getSubcommand()

    const settings = db.collection(`Bot/settings/${interaction.guildId}`).doc("settings")

    if (subcommand === "enable") {
      await interaction.deferReply()

      try {
        await cacheManager.set(
          settings,
          {
            enabledChannels: FieldValue.arrayUnion(interaction.channelId),
          },
          { merge: true }
        )

        await interaction.editReply("The Oculus database has been enabled in this channel.")
      } catch (error) {
        console.log("Failed to enable the Oculus database in a channel because an error occurred.")
        console.log(error)

        await interaction.editReply("Failed to enable the Oculus database in this channel because an error occurred.")
      }
    } else if (subcommand === "disable") {
      await interaction.deferReply()

      try {
        await cacheManager.set(
          settings,
          {
            enabledChannels: FieldValue.arrayRemove(interaction.channelId),
          },
          { merge: true }
        )

        await interaction.editReply("The Oculus database has been disabled in this channel.")
      } catch (error) {
        console.log("Failed to disable the Oculus database in a channel because an error occurred.")
        console.log(error)

        await interaction.editReply("Failed to disable the Oculus database in this channel because an error occurred.")
      }
    } else if (subcommand === "list") {
      await interaction.deferReply()

      try {
        const settingsData = new ServerSettings((await cacheManager.get(settings)).data())

        const enabledChannels = settingsData.enabledChannels

        if (enabledChannels.length === 0) {
          await interaction.editReply("The Oculus database is not enabled in any channels.")
        } else {
          await interaction.editReply(
            `The Oculus database is enabled in the following channels:\n* <#${enabledChannels.join(">\n* <#")}>`
          )
        }
      } catch (error) {
        console.log("Failed to list the channels that the Oculus database is enabled in because an error occurred.")
        console.log(error)

        await interaction.editReply(
          "Failed to list the channels that the Oculus database is enabled in because an error occurred."
        )
      }
    }
  }
)
