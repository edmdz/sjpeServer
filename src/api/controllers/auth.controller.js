import {AuthService} from '../services'

const AuthController = (router) => {
  const authSer = new AuthService

  router.post('/user', authSer.createUser)
  router.delete('/user', authSer.deleteUser)
  router.put('/user', authSer.updateUser)
}

export {AuthController as default}