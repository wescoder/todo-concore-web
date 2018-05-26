const next = require('next')
const { createServer } = require('http')
const { join } = require('path')
const { parse } = require('url')

const env = require('./config/env')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const staticRoutes = []
const { APP_PORT, PUBLIC_URL, NOW_URL } = env.raw

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl

      if (staticRoutes.includes(pathname)) {
        const filePath = join(__dirname, '.next', pathname)

        app.serveStatic(req, res, filePath)
      } else {
        handle(req, res, parsedUrl)
      }
    })
      .listen(APP_PORT, () => console.log(`> Ready on: ${NOW_URL || PUBLIC_URL}`))
  })
