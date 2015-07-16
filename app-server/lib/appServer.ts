import * as http from 'http'
import * as fs from 'fs'
import * as RxRouter from 'koa-rx-router'
import {createRemoteProxy, createLocalProxy as createLocalMLProxy} from 'ml-uservices'
import {createAdminClient} from 'ml-admin'
import {createDatabaseClient, queryBuilder as qb} from 'marklogic'
import {CustomerService} from 'ml-retail-demo-common'
import {createLocalProxy} from 'uservices-socket.io-server'
import * as path from 'path'
import * as u from 'uservices'
import * as mu from 'ml-uservices'
import {Config} from 'ml-project'
import * as s from 'typescript-schema'
import {ProductServiceImpl} from './services/productService'
import {TwitterServiceImpl} from './services/twitterService'
import {StoreServiceImpl} from './services/storeService'
import {TwitterService, ProductService, createClient, customerServiceProxy, productServiceProxy, twitterServiceProxy} from 'ml-retail-demo-database'
import {inject, wired} from 'tschuss'

let koa = require('koa')
let serve = require('koa-static')
let io = require('socket.io')
let mount = require('koa-mount')

let config = <Config> require('../../../config.json')
let dbSchema = s.rawSchemaToSchema(<s.RawSchema>require('../../../database/dist/json/schema.json'))
let schema = s.rawSchemaToSchema(<s.RawSchema>require('../json/schema.json'))
let commonSchema = s.rawSchemaToSchema(<s.RawSchema>require('../../../common/dist/json/schema.json'))
let listenerPath = config.middle.listenerPath
if (listenerPath.charAt(0) !== '/') {
  listenerPath = '/' + listenerPath
}

export class AppServer {

  private customerService: CustomerService

  constructor(@inject() customerService: CustomerService) {
    this.customerService = customerService
  }

  start() {
    let app = koa()
    let customerApp = koa()
    let shopAssistantApp = koa()

    let router = new RxRouter({
        prefix: listenerPath
    })

    let client = createClient()

    let productService = new ProductServiceImpl(client)
    let twitterService = new TwitterServiceImpl({
      consumer_key: 'NBhEhVOMu0qmRJPxg5f8CNUNY',
      consumer_secret: 'RYwQtPFGTjzaJtwvuqluS80Fh5INlrtyH6eDkRzarIM2NDJDL1',
      access_token_key: '2836075834-gDCpDRnqc1MpNqHLKTutq8Nx8fOX6R8RMXKEzM5',
      access_token_secret: 'kvKG7mejlcXE1v66Nst35h5GVqgqyLjod9RjFSivoc20m'
    })
    let storeService = new StoreServiceImpl(client)

    app.use(router.routes())

    shopAssistantApp.use(serve(path.join(__dirname,  '../../../shop-assistant-app/dist/www')))
    customerApp.use(serve(path.join(__dirname,  '../../../customer-app/dist/www')))

    app.use(mount('/customer', customerApp))
    app.use(mount('/store', shopAssistantApp))

    let fn = app.callback()

    let httpServer = http.createServer(fn)
    let ioServer = io(httpServer)

    createLocalProxy(ioServer, commonSchema['ml-retail-demo-common/services/productService'].interfaces['ProductService'], productService)
    createLocalProxy(ioServer, commonSchema['ml-retail-demo-common/services/customerService'].interfaces['CustomerService'], this.customerService)
    createLocalProxy(ioServer, commonSchema['ml-retail-demo-common/services/storeService'].interfaces['StoreService'], storeService)
    createLocalMLProxy(dbSchema['ml-retail-demo-database/proxies/twitterService'].classes['TwitterServiceML'], twitterService, client, router)

    httpServer.listen(config.middle.port, config.middle.host, function(err) {
      if (err) {
        throw err
      }
      console.log('Server listening on port %s', this.address().port)
    })
  }

  stop() {

  }
}












export function createAppServer() {
  let app = koa()
  let customerApp = koa()
  let shopAssistantApp = koa()

  let router = new RxRouter({
      prefix: listenerPath
  })

  let client = createClient()

  let mlProductService = productServiceProxy(client, router)
  let customerService = customerServiceProxy(client, router)
  let mlTwitterService = twitterServiceProxy(client, router)

  let productService = new ProductServiceImpl(client, mlProductService)
  let twitterService = new TwitterServiceImpl({
    consumer_key: 'NBhEhVOMu0qmRJPxg5f8CNUNY',
    consumer_secret: 'RYwQtPFGTjzaJtwvuqluS80Fh5INlrtyH6eDkRzarIM2NDJDL1',
    access_token_key: '2836075834-gDCpDRnqc1MpNqHLKTutq8Nx8fOX6R8RMXKEzM5',
    access_token_secret: 'kvKG7mejlcXE1v66Nst35h5GVqgqyLjod9RjFSivoc20m'
  })
  let storeService = new StoreServiceImpl(client, mlTwitterService)

  app.use(router.routes())

  shopAssistantApp.use(serve(path.join(__dirname,  '../../../shop-assistant-app/dist/www')))
  customerApp.use(serve(path.join(__dirname,  '../../../customer-app/dist/www')))

  app.use(mount('/customer', customerApp))
  app.use(mount('/store', shopAssistantApp))

  let fn = app.callback()

  let httpServer = http.createServer(fn)
  let ioServer = io(httpServer)
  createLocalProxy(ioServer, commonSchema['ml-retail-demo-common/services/productService'].interfaces['ProductService'], productService)
  createLocalProxy(ioServer, commonSchema['ml-retail-demo-common/services/customerService'].interfaces['CustomerService'], customerService)
  createLocalProxy(ioServer, commonSchema['ml-retail-demo-common/services/storeService'].interfaces['StoreService'], storeService)
  createLocalMLProxy(schema['ml-retail-demo-app-server/services/twitterService'].classes['TwitterServiceImpl'], twitterService, client, router)

  httpServer.listen(config.middle.port, config.middle.host, function(err) {
    if (err) {
      throw err
    }
    console.log('Server listening on port %s', this.address().port)

    /*twitterService.getTweets('christyharagan', 'marklogic').then(function(tweets){
      console.log(tweets)
      }, function(e){
        console.log(e)
      })*/

    /*storeService.getHighValueCustomers(51.4162706, -0.1932091).subscribe(function(hvc){
      console.log(hvc)
    })*/
  })
}

createAppServer()









/*twitterService.getTweets('christyharagan', 'marklogic').then(function(tweets){
  console.log(tweets)
  }, function(e){
    console.log(e)
  })*/

/*storeService.getHighValueCustomers(51.4162706, -0.1932091).subscribe(function(hvc){
  console.log(hvc)
})*/

/*client.documents.query( qb.where(
   qb.geospatial(qb.geoPath('/currentLocation'), qb.circle(100, 51.4162706, -0.1932091))
 )).result(function (documents) {
   documents.forEach(function(doc){
     console.log(JSON.stringify(doc.content, null, 2));
   })
 }, function(error) {
   console.log(JSON.stringify(error, null, 2));
 });*/





// var query = [
//   'SELECT ?personName1' ,
//   'WHERE {' ,
//   '    "a" "b"  ?personName1 ;' ,
//   '    }'
// ];
// client.graphs.sparql('application/sparql-results+json', query.join('\n')
// ).result(function (result) {
//   console.log(JSON.stringify(result, null, 2));
// }, function(error) {
//   console.log(JSON.stringify(error, null, 2));
// });

////// FACETS

// client.documents.query(
//   qb.where(qb.directory('/'))
//     .calculate(qb.facet('categories', qb.pathIndex('/categories')))
//     .withOptions({categories: 'none'})
// ).result( function(results) {
//   console.log(JSON.stringify(results, null, 2));
// }, function(error) {
//
//   console.log(JSON.stringify(error, null, 2));
// })

////// SEARCH

/*client.documents.query( qb.where(
   qb.term(qb.pathIndex('/categories'), 'Cat1'), qb.parsedFrom('Hello')
 ).slice(qb.snippet()).withOptions({categories: ['content', 'metadata']})
 ).result(function (documents) {
   documents.forEach(function(doc){
     console.log(JSON.stringify(doc, null, 2));
   })
 }, function(error) {
   console.log(JSON.stringify(error, null, 2));
 });*/

// client.documents.query( qb.where(
//   qb.term(qb.parsedFrom('Hello'))
// ).slice(qb.snippet()).withOptions({categories: 'none'})
// ).result(function (documents) {
//   documents.forEach(function(doc){
//     console.log(JSON.stringify(doc, null, 2));
//   })
// }, function(error) {
//   console.log(JSON.stringify(error, null, 2));
// });


///// GEOSPATIAL

/*client.documents.query( qb.where(
   qb.geospatial(qb.geoPath('/currentLocation'), qb.circle(100, 50.537032, -0.095230))
 )).result(function (documents) {
   documents.forEach(function(doc){
     console.log(JSON.stringify(doc.content, null, 2));
   })
 }, function(error) {
   console.log(JSON.stringify(error, null, 2));
 });*/
