import { SessionsClient } from "@google-cloud/dialogflow"
import { google } from "@google-cloud/dialogflow/build/protos/protos"
import { projectId } from "./application-info"

const sessionClient = new SessionsClient()

const contexts: Record<string, google.cloud.dialogflow.v2.IContext[] | null | undefined> = {}

export async function sendChatbotQuery(authorId: string, query: string) {
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, authorId)

  const request: google.cloud.dialogflow.v2.IDetectIntentRequest = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: "en",
      },
    },
    queryParams: {
      contexts: contexts[authorId],
    },
  }

  try {
    const [response] = await sessionClient.detectIntent(request)

    contexts[authorId] = response.queryResult?.outputContexts

    return response.queryResult?.fulfillmentMessages?.[0]?.text?.text?.[0]
  } catch (error) {
    console.error(error)
  }
}
