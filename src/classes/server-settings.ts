import { DocumentData } from "firebase-admin/firestore";

export default class ServerSettings {
    enabledChannels: string[]

    constructor(data: DocumentData | undefined) {
            this.enabledChannels = data?.enabledChannels as string[] | undefined ?? []
    }
}