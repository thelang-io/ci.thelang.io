require('dotenv').config()

const Sentry = require('@sentry/node')
const express = require('express')
const debug = require('debug')('app:app')
const path = require('path')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 8080

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations()
  ],
  tracesSampleRate: 0.15
})

app.disable('x-powered-by')
app.set('trust proxy', true)
app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())
app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)
app.use(Sentry.Handlers.errorHandler())

const server = app.listen(port, () => {
  debug(`Example app listening on port ${port}`)
})

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')

  server.close(() => {
    debug('HTTP server closed')
  })
})
