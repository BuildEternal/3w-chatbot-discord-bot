// eslint-disable-next-line import/no-unresolved
import { DocumentData } from "firebase-admin/firestore";

export default class ServerSettings {
    oculusChannels: string[]

    constructor(data: DocumentData | undefined) {
            this.oculusChannels = data?.oculusChannels as string[] | undefined ?? []
    }
}