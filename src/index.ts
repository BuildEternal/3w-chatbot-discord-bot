import listenToChat from "./listeners/listen-to-chat"
import listenToChatInputCommandCreate from "./listeners/listen-to-chat-input-command-create"
import listenToClientReady from "./listeners/listen-to-client-ready"
import listenToError from "./listeners/listen-to-error"
import loginToClient from "./login-to-client"
import registerCommands from "./register-commands"

async function main() {
  // Register listeners
  listenToChat()
  listenToChatInputCommandCreate()
  listenToClientReady()
  listenToError()

  // Register commands
  await registerCommands()

  // Login to client
  await loginToClient()
}

void main()
