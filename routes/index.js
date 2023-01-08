const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const echoController = require('../controllers/echo')
const webhookController = require('../controllers/webhook')
const withGitHubWebhook = require('../middlewares/github-webhook')
const wrap = require('../middlewares/wrap')

const router = express.Router()
const textParser = bodyParser.text({ type: () => true })

router.all('/echo', textParser, wrap(echoController))
router.all('/webhook', textParser, withGitHubWebhook, wrap(webhookController))

router.all('*', helmet(), (_req, res) => {
  res.redirect(301, 'https://thelang.io/?utm_source=ci')
})

module.exports = router
