import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

export default class Command {
  data: SlashCommandBuilder
  execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>

  constructor(
    data: SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>
  ) {
    this.data = data
    this.execute = execute
  }
}
