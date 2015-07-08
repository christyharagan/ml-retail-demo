import {ProductServiceImpl} from './services/productService'
import * as s from 'typescript-schema'
import {CustomerService, ProductService} from 'ml-retail-demo-common'
import {createRemoteProxy} from 'uservices-socket.io-client'

let appSchema = s.rawSchemaToSchema(<s.RawSchema>require('../json/schema.json'))
let commonSchema = s.rawSchemaToSchema(<s.RawSchema>require('../../../ml-retail-demo-common/dist/json/schema.json'))

export function productServiceProxy(client: SocketIOClient.Socket):ProductService {
  return <ProductService> createRemoteProxy(client, commonSchema['services/productService'].interfaces['ProductService'])
}

export function customerServiceProxy(client: SocketIOClient.Socket):CustomerService {
  return <CustomerService> createRemoteProxy(client, commonSchema['services/customerService'].interfaces['CustomerService'])
}
