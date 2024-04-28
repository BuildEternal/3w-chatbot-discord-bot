import { initializeApp } from "firebase-admin/app"
import {
  // DocumentData,
  // DocumentReference,
  // DocumentSnapshot,
  // PartialWithFieldValue,
  // SetOptions,
  // WithFieldValue,
  // WriteResult,
  getFirestore,
} from "firebase-admin/firestore"

initializeApp()

// Database

export const db = getFirestore()

db.settings({ ignoreUndefinedProperties: true })

// Cache Manager

// const CACHE_EXPIRY = 60000

// const cache: Record<string, { doc: DocumentSnapshot<DocumentData>; timestamp: number }> = {}

// async function get(docRef: DocumentReference<DocumentData>) {
//   const cachedDoc = cache[docRef.path]

//   if (cachedDoc && cachedDoc.timestamp + CACHE_EXPIRY > Date.now()) return cachedDoc.doc

//   const doc = await docRef.get()

//   cache[docRef.path] = {
//     doc: doc,
//     timestamp: Date.now(),
//   }

//   return doc
// }

// async function set(
//   docRef: DocumentReference<DocumentData>,
//   data: PartialWithFieldValue<DocumentData>,
//   options: SetOptions
// ): Promise<WriteResult>

// async function set(docRef: DocumentReference<DocumentData>, data: WithFieldValue<DocumentData>): Promise<WriteResult>

// async function set(
//   docRef: DocumentReference<DocumentData>,
//   data: WithFieldValue<DocumentData> | PartialWithFieldValue<DocumentData>,
//   options?: SetOptions
// ): Promise<WriteResult> {
//   const docWriteResult = await (options ? docRef.set(data, options) : docRef.set(data))

//   const cachedDoc = cache[docRef.path]
//   if (cachedDoc) cachedDoc.timestamp = -Infinity

//   return docWriteResult
// }

// export const cacheManager = {
//   get,
//   set,
// }
