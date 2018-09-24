import FireBase from '../utils/firebaseService'

const { auth, database } = FireBase
const collection = database.collection('users')

export class AuthService {
  async createUser(request, response) {
    let {email, phone, verified, password, isEnable, nickname} =  request.body
    let result = await auth.createUser({
      email: email,
      phoneNumber: phone,
      emailVerified: verified,
      password: password,
      displayName: nickname,
      disabled: isEnable
    })

    collection.doc(result.uid).set({
      email: result.email,
      nickname: result.displayName,
      passwordHash: result.passwordHash,
      createdDate: Date.now()
    })
    
    return response.status(200).send(result)
  }

  async updateUser(request, response) {
    let { email, newEmail, nickname, newPassword } = request.body
    let user = await auth.getUserByEmail(email)
    let result = await auth.updateUser(user.uid, {
      email: email ? newEmail : user.email,
      nickname: nickname ? nickname : user.displayName,
      password: newPassword
    })
    collection.doc(result.uid).set({
      email: result.email,
      nickname: result.displayName,
      passwordHash: result.passwordHash
    })
    return response.status(200).send(result)
  }

  async deleteUser(request, response) {
    let user = await auth.getUserByEmail(request.body.email)
    let result = await auth.deleteUser(user.uid)
    collection.doc(user.uid).delete()
    return response.status(200).send(result)
  }
}