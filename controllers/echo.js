const fs = require('fs')
const path = require('path')

const examplePath = path.join(
  __dirname,
  '../data/example.html'
)

const standardHeadersPath = path.join(
  __dirname,
  '../data/standard-headers.txt'
)

const exampleData = fs.readFileSync(examplePath, 'utf8').trim()
const standardHeaders = fs.readFileSync(standardHeadersPath, 'utf8')
  .trim()
  .split('\n')
  .map(it => it.trim())
  .filter(it => it !== '')

module.exports = async (req, res) => {
  const reqBody = typeof req.body === 'string' ? req.body : ''
  const statusCode = parseInt(req.query.status) || 200
  const sleepTime = parseInt(req.query.sleep) || 0
  const headerKeys = Object.keys(req.headers)
    .filter(it => !standardHeaders.includes(it))

  if (sleepTime > 0) {
    await new Promise((resolve) => {
      setTimeout(resolve, sleepTime)
    })
  }

  for (const headerKey of headerKeys) {
    res.setHeader(headerKey, req.headers[headerKey])
  }

  res.status(statusCode)

  if (Object.prototype.hasOwnProperty.call(req.query, 'example')) {
    res.setHeader('content-type', 'text/html')
    res.end(exampleData)
  } else if (Object.prototype.hasOwnProperty.call(req.query, 'ip')) {
    res.end(req.ip)
  } else {
    res.end(reqBody)
  }
}
