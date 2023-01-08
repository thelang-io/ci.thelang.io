const { Webhooks } = require('@octokit/webhooks')

const webhooks = new Webhooks({
  secret: process.env.GITHUB_WEBHOOK_SECRET
})

module.exports = (req, res, next) => {
  if (!webhooks.verify(req.body, req.headers['x-hub-signature-256'])) {
    res.status(400).json({
      success: false,
      error: 'Webhook validation failed'
    })

    return
  }

  let payload = null

  try {
    payload = JSON.parse(req.body)
  } catch {
  }

  if (payload === null) {
    res.status(400).json({
      success: false,
      error: 'Webhook parse failed'
    })

    return
  }

  req.body = payload
  next()
}
