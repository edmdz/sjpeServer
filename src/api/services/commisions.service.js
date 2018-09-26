import Firebase from '../utils/firebaseService'

let { database } = Firebase

const commissionCollection = database.collection('commissions')
const userCollection = database.collection('users')

export class CommissionsService {

  async updateComission(request, response) {
    let { members, commissionName } = request.body
    let refArray = []
    for (let member of members) {
      let ref = await userCollection.doc(member).get()
      refArray.push(ref.ref)
    }
    let result = await commissionCollection.doc(commissionName).update({
      members: refArray
    })
    return result
  }

  async getCommission(request, response) {
    let commissions = []
    let refs = []
    let querySnap = await commissionCollection.get()
    querySnap.forEach(commission => {
      refs.push(commission)
    })

    for (let commission of refs) {
      let commissionData = commission.data()
      let commissionObj = {}
      commissionObj.title = commission.id
      if (commissionData.members) {
        commissionObj.members = []
        for (let member of commissionData.members) {
          let result = await member.get()
          commissionObj.members.push(result.data())
        };
      }
      console.log(commissionObj)
      commissions.push(commissionObj)
    }

    return commissions
  }
}