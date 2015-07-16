import { Match, FacetValue as FacetValueWithCount } from 'marklogic';
import { Product } from '../models/product';
import { Observable } from 'rx';
export interface SearchResult {
    product: Product;
    match: Match;
}
export interface ProductService {
    searchProducts(query: string, facetValues: FacetValueWithCount<any>[]): Promise<SearchResult[]>;
    getCategories(): Observable<FacetValueWithCount<any>[]>;
}
