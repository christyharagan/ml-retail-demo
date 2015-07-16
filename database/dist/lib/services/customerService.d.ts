import { CustomerService, Customer } from 'ml-retail-demo-common';
export declare const CUSTOMER_NOT_FOUND_ERROR: string;
export declare class CustomerServiceML implements CustomerService {
    login(username: string): Promise<boolean>;
    logout(username: string): Promise<boolean>;
    register(customer: Customer): Promise<boolean>;
    updateLocation(username: string, latLong: string): Promise<any>;
}
