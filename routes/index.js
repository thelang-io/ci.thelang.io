const express = require('express')
const helmet = require('helmet')

const router = express.Router()

router.all('*', helmet(), (_req, res) => {
  res.redirect(301, 'https://thelang.io/?utm_source=ci')
})

module.exports = router
