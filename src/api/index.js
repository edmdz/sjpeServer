import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import logger from 'morgan'

import controllers from './controllers'

/**
 * @author Roel Mendoza
 * ExpressServer realiza todas las configuraciones de express
 * incluyendo las rutas de la api
 * @param {Object} config // Objeto con las configuraciones necesarias
*/
function ExpressServer () {
  this.express = express()
  this.router = express.Router()

  // configuracion del servidor
  this.express.use(bodyParser.urlencoded({extended: true}))
  this.express.use(bodyParser.json())
  this.express.use(logger('dev'))
  this.express.use(helmet()) // Quitamos cabeceras de las respuestas http como engine
  this.express.use(cors()) // Permitimos across domain
  this.express.use(compression())

  let controller

  for (controller in controllers) {
    controllers[controller](this.router)
  }

  this.express.use('/api/sjpe/v1', this.router)
  this.express.use((req, res) => res.send('404')) // En caso de no encontrar una ruta regresamos 404
}

export { ExpressServer as default }
