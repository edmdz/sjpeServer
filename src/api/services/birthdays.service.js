import Firebase from '../utils/firebaseService'
import getTimestamps from '../utils/getTimestamps'
const { database } = Firebase

const birthdaysCollection = database.collection('birthdays')
const userCollection = database.collection('users')

export class BirthdaysService {
  async postBirthday(request,response){
    let {date, user} = request.body
    let query = await userCollection.doc(user.uid).get()
    let userRef = query.ref

    let result = await birthdaysCollection.add({
      date: Date.parse(`${date}T00:00:00`),
      user: userRef
    })

    return result 
  }

  async getBirthdaysByMonth(request,response){
    let {month} = request.params
    let [first, second] = getTimestamps(month)
    let birthdaysObj = {}
    birthdaysObj.month = month
    birthdaysObj.birthdays = []
    let result = await birthdaysCollection.where('date', '>=', first).where('date', '<=', second).get()
    let birthdaysRefs = []
    result.forEach( doc => {
      birthdaysRefs.push(doc)
    })

    for(let doc of birthdaysRefs){
      let docData = doc.data()
      let userData = await docData.user.get()
      console.log(userData.data())
      birthdaysObj.birthdays.push({
        date: new Date(docData.date).toString(),
        userData: userData.data()
      })
    }
    return birthdaysObj
  }  
}