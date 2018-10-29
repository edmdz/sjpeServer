import Firebase from '../utils/firebaseService'
import getTimestamps from '../utils/getTimestamps'

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
    return result
  }

  async getActivityByUid(request, response) {
    let { uid } = request.params
    let docRef = await collection.doc(uid).get()
    let data = docRef.data()
    let activityObj = {
      date: new Date(data.date).toString(),
      title: data.title,
      description: data.description
    }
    return activityObj
  }

  async deleteActivityByUid(request,response){
    let { uid } = request.params
    let result = await collection.doc(uid).delete()
    return result
  }

  async getActivitiesByMonth(request,response){
    console.log('holas')
    let { month } = request.params
    let [firstDate,secondDate] = getTimestamps(month)
    let query = collection.where("date",">=",firstDate).where("date","<=",secondDate)
    let references = await query.get()
    let referencesArray = []
    references.forEach(doc => {
      referencesArray.push(doc)
    })
    let resultArray = []
    for(let ref of referencesArray){
      resultArray.push(ref.data())
    }
    return resultArray
  }
}