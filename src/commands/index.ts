import { Collection } from "discord.js"
import Command from "../classes/command"

import oculusping from "./oculusping"

const commands = new Collection<string, Command>()

commands.set(oculusping.data.name, oculusping)

export default commands
