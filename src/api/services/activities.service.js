import Firebase from '../utils/firebaseService'

const { database } = Firebase
const collection = database.collection('activities')

export class ActivitiesService {

  async createActivitiy(request, response) {
    let { title, description, date } = request.body
    let dateD = Date.parse(date)
    let result = await collection.add({
      title,
      date: dateD,
      description
    })
    let docRef = await result.get()
    let someDate = new Date(docRef.data().date)
    console.log(new Date.toString())
    return response.status(200).send()
  }

  async getActivityByUid(request, response) {
    let { uid } = request.params
    let docRef = await collection.doc(uid).get()
    return response.status(200).send(new Date(docRef.data().date).toDateString())
  }
}