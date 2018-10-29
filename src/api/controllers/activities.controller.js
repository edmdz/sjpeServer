import { ActivitiesService } from '../services'
import {async} from '../utils/async'

const ActivititesController = (router) => {
  const activitiesSer = new ActivitiesService

  router.post('/activities', async(activitiesSer.createActivitiy))
  router.get('/activities/:uid', async(activitiesSer.getActivityByUid))
  router.get('/activities/byMonth/:month', async(activitiesSer.getActivitiesByMonth))
  router.delete('/activities/:uid', async(activitiesSer.deleteActivityByUid))
}

export { ActivititesController as default } 