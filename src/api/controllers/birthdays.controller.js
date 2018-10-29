import { BirthdaysService } from '../services'
import {async} from '../utils/async'

const BirthdaysController = (router) => {
  const birthdaysService = new BirthdaysService
  
  router.post('/birthday', async(birthdaysService.postBirthday))
  router.get('/birthday/:month', async(birthdaysService.getBirthdaysByMonth))
}

export default BirthdaysController