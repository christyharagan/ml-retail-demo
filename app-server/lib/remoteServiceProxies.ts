import {ProductServiceImpl} from './services/productService'
import * as s from 'typescript-schema'
import {CustomerService, ProductService, StoreService} from 'ml-retail-demo-common'
import {createRemoteProxy} from 'uservices-socket.io-client'

let commonSchema = s.rawSchemaToSchema(<s.RawSchema>require('../../../ml-retail-demo-common/dist/json/schema.json'))

export function productServiceProxy(client: SocketIOClient.Socket):ProductService {
  return <ProductService> createRemoteProxy(client, commonSchema['ml-retail-demo-common/services/productService'].interfaces['ProductService'])
}

export function customerServiceProxy(client: SocketIOClient.Socket):CustomerService {
  return <CustomerService> createRemoteProxy(client, commonSchema['ml-retail-demo-common/services/customerService'].interfaces['CustomerService'])
}

export function storeServiceProxy(client: SocketIOClient.Socket):StoreService {
  return <StoreService> createRemoteProxy(client, commonSchema['ml-retail-demo-common/services/storeService'].interfaces['StoreService'])
}
