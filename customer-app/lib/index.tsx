import {run} from '@cycle/core'
import {makeDOMDriver} from 'cycle-react'
import * as React from 'react'
import {Observable} from 'rx'
import {productServiceProxy, customerServiceProxy} from 'ml-retail-demo-app-server'
import * as io from 'socket.io-client'
import {app, Services} from './app/appComponent'
import {Config} from 'ml-project'

let config = require('../../../config.json') as Config
let ioClient = io(`http://${config.middle.host}:${config.middle.port}`)

let productService = productServiceProxy(ioClient)
let customerService = customerServiceProxy(ioClient)

run(app, {
  DOM: makeDOMDriver('.app'),
  services: function () {
    return {
      get: function() {
        return Observable.just({
          customer: customerService,
          product: productService
        } as Services)
      }
    }
  }
})
