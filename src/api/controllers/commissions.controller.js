import { CommissionsService } from '../services'
import {async} from '../utils/async'

const CommissionsController = (router) => {
  const commissionsSer = new CommissionsService

  router.put('/commission', async(commissionsSer.updateComission))
  router.get('/commission', async(commissionsSer.getCommission))
}

export { CommissionsController as default }