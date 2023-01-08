require('dotenv').config()

const express = require('express')
const debug = require('debug')('app:app')
const path = require('path')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 8080

app.disable('x-powered-by')
app.set('trust proxy', true)
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(routes)

const server = app.listen(port, () => {
  debug(`Example app listening on port ${port}`)
})

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')

  server.close(() => {
    debug('HTTP server closed')
  })
})
