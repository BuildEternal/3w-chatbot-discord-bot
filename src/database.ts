// eslint-disable-next-line import/no-unresolved
import { initializeApp } from "firebase-admin/app"
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from "firebase-admin/firestore"

initializeApp()

export const database = getFirestore()

database.settings({ ignoreUndefinedProperties: true })