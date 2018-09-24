'use strict'

import http from 'http'
import ExpressServer from './api'
import dotnev from 'dotenv' // Libreria de acceso a variables de entorno

// Carga las variables de entorno para poder usarlas con process.env.VARIABLE
// Con esto son accesibles para toda la aplicación
dotnev.load()

let api = new ExpressServer()
let server = http.createServer(api.express)
console.log()
server.listen(process.env.PORT, () => console.log(`Servidor corriendo en  ${process.env.PORT}`))
