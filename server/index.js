/* eslint-disable no-undef */
const { createServer } = require('http')
const { join } = require('path')
const { parse } = require('url')
const next = require('next')

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl
      console.log('pathname : ', pathname);
      const rootPaths = ['/firebase-messaging-sw.js', '/manifest.json']
      for(rootPath of rootPaths) {
        if ( pathname === rootPath ) {
          const filePath = join(__dirname, '/../static', pathname)
          app.serveStatic(req, res, filePath)  
          return
        }
      }

      if (pathname === '/service-worker.js') {
        console.log('serve')
        const filePath = join(__dirname, '../.next', pathname)
        console.log('filePath : ', filePath)
        app.serveStatic(req, res, filePath)
      } else {
        handle(req, res, parsedUrl)
      }

      // if(pathname == '/firebase-messaging-sw.js') {
      //   const filePath = join(__dirname, 'static/',pathname)

      //   app.serveStatic(req, res, filePath)
      // } else {
      //   handle(req, res, parsedUrl)
      // }
    })
    .listen(process.env.APP_PORT || 3123, () => {
      console.log(`> Ready on http://localhost:${process.env.APP_PORT || 3123}`)
    })
  });