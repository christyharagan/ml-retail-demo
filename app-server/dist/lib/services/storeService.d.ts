import { StoreService, Customer } from 'ml-retail-demo-common';
import { Client } from 'marklogic';
import { Observable } from 'rx';
export declare class StoreServiceImpl implements StoreService {
    private client;
    private mlTwitterService;
    constructor(client: Client, mlTwitterService?: any);
    getHighValueCustomers(lat: number, long: number): Observable<Customer[]>;
}
