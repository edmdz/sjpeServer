import { ActivitiesService } from '../services'

const ActivititesController = (router) => {
  const activitiesSer = new ActivitiesService

  router.post('/activities', activitiesSer.createActivitiy)
  router.get('/activities/:uid', activitiesSer.getActivityByUid)
}

export { ActivititesController as default } 