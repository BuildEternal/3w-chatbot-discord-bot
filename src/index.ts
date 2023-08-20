import listenToChatInputCommandCreate from "./listeners/listen-to-chat-input-command-create"
import listenToClientReady from "./listeners/listen-to-client-ready"
import listenToError from "./listeners/listen-to-error"
import loginToClient from "./login-to-client"
import registerCommands from "./register-commands"

// Register listeners
void listenToClientReady()
listenToChatInputCommandCreate()
void listenToError()

// Register commands
void registerCommands()

// Login to client
void loginToClient()
