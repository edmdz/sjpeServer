import { AuthService } from '../services'
import { async } from '../utils/async'

const AuthController = (router) => {
  const authSer = new AuthService

  router.post('/user', async(authSer.createUser))
  router.delete('/user', async(authSer.deleteUser))
  router.put('/user', async(authSer.updateUser))
}

export { AuthController as default }