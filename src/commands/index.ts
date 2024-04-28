import { Collection } from "discord.js"
import Command from "../classes/command"

import oculusping from "./ping"
import oculuschannel from "./channel"

const commands = new Collection<string, Command>()

commands.set(oculuschannel.data.name, oculuschannel)
commands.set(oculusping.data.name, oculusping)

export default commands
