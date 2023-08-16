import fs from "fs"
import path from "path"

import { Collection } from "discord.js"
import { Command } from "../types/command"

const commands = new Collection<string, Command>()

const commandFiles = fs.readdirSync(__dirname).filter((file) => file.endsWith(".ts") && file !== "index.ts")

export default Promise.all(
  commandFiles.map(async (file) => {
    const filePath = path.join(__dirname, file)

    const command = (await import(filePath)).default

    if ("data" in command && "execute" in command) {
      commands.set(command.data.name, command)
    } else {
      throw new Error(`The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
  })
).then(() => commands)
