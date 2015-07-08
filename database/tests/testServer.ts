import * as http from 'http'
import * as RxRouter from 'koa-rx-router'
import {Config} from 'ml-project'
import {Server} from 'ml-uservices'

export function createTestServer(): [Server, ()=>Promise<any>] {
  let koa = require('koa')
  let app = koa()

  let config = <Config> require('../../../config.json')

  let router = new RxRouter({
      prefix: config.middle.listenerPath
  })

  return [router, function() {
    return new Promise(function(resolve, reject){
      app.use(router.routes())
      let fn = app.callback()

      let httpServer = http.createServer(fn)
      httpServer.listen(8080, function(err) {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }]
}
