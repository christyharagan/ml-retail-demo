import { GeoIndex } from 'ml-admin';
import { Customer, Name } from 'ml-retail-demo-common';
export declare class CustomerLocation extends GeoIndex {
}
export declare class MLCustomer implements Customer {
    username: string;
    name: Name;
    twitterId: string;
    loggedIn: boolean;
    currentLocation: string;
}
