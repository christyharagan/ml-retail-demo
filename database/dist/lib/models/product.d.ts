import { Facet } from 'ml-admin';
import { Product } from 'ml-retail-demo-common';
export declare class CategoriesFacet extends Facet {
    name: string;
    path: string;
}
export declare class MLProduct implements Product {
    name: string;
    id: string;
    basePrice: number;
    imageUrl: string;
    description: any;
    categories: string[];
}
