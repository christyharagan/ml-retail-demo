import { CustomerService, ProductService, StoreService } from 'ml-retail-demo-common';
export declare function productServiceProxy(client: SocketIOClient.Socket): ProductService;
export declare function customerServiceProxy(client: SocketIOClient.Socket): CustomerService;
export declare function storeServiceProxy(client: SocketIOClient.Socket): StoreService;
