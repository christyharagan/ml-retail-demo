import { CustomerService } from 'ml-retail-demo-common';
export declare class AppServer {
    private customerService;
    constructor(customerService: CustomerService);
    start(): void;
    stop(): void;
}
export declare function createAppServer(): void;
