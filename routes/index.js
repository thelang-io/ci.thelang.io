const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const echoController = require('../controllers/echo')
const wrapMiddleware = require('../middlewares/wrap')

const router = express.Router()

router.all(
  '/echo',
  bodyParser.text({ type: () => true }),
  wrapMiddleware(echoController)
)

router.all('*', helmet(), (_req, res) => {
  res.redirect(301, 'https://thelang.io/?utm_source=ci')
})

module.exports = router
