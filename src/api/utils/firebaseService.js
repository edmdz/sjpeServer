import admin from 'firebase-admin'
import serviceAccount from '../../../sjpeserver-firebase-admin.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sjpeserver.firebaseio.com'
})

const auth = admin.auth()
const database = admin.firestore()
database.settings({
  timestampsInSnapshots: true
})
const storage =  admin.storage()

export default {
  auth,
  database,
  storage
}