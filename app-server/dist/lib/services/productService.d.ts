import { ProductService, SearchResult } from 'ml-retail-demo-common';
import { FacetValue as FacetValueWithCount, Client } from 'marklogic';
import { Observable } from 'rx';
export declare class ProductServiceImpl implements ProductService {
    private mlProductService;
    private client;
    constructor(client: Client, mlProductService?: any);
    searchProducts(query: string, facetValues: FacetValueWithCount<any>[]): Promise<SearchResult[]>;
    getCategories(): Observable<FacetValueWithCount<string>[]>;
}
