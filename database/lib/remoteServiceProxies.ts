import {ProductService} from './services/productService'
import {CustomerServiceML} from './services/customerService'
import {TwitterService} from './services/twitterService'
import * as s from 'typescript-schema'
import {Server, createRemoteProxy} from 'ml-uservices'
import {Client} from 'marklogic'
import {CustomerService} from 'ml-retail-demo-common'

let dbSchema = s.rawSchemaToSchema(<s.RawSchema>require('../json/schema.json'))
let commonSchema = s.rawSchemaToSchema(<s.RawSchema>require('../../../common/dist/json/schema.json'))

export function productServiceProxy(client: Client, server: Server):ProductService {
  return <ProductService> createRemoteProxy(dbSchema['ml-retail-demo-database/services/productService'].classes['ProductService'], client, server)
}

export function customerServiceProxy(client:Client, server: Server):CustomerService {
  return <CustomerService> createRemoteProxy(dbSchema['ml-retail-demo-database/services/customerService'].classes['CustomerServiceML'], client, server)
}

export function twitterServiceProxy(client:Client, server:Server): TwitterService {
  return <TwitterService> createRemoteProxy(dbSchema['ml-retail-demo-database/services/twitterService'].classes['TwitterService'], client, server)
}

export function twitterSpec(): s.Interface {
  return commonSchema['ml-retail-demo-common/services/twitterService'].interfaces['TwitterService']
}
