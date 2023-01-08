const debug = require('debug')('app:controller-webhook')

module.exports = async (req, res) => {
  if (req.body.ref !== 'refs/heads/main') {
    res.end('OK')
    return
  }

  const commits = req.body.commits.map(it => it.id)

  if (commits.length === 0) {
    res.status(400).json({
      success: false,
      error: 'Webhook has no commits'
    })

    return
  }

  debug(commits)
  res.end('OK')
}
