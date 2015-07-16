import { Observable } from 'uservices';
import { FacetValue } from 'marklogic';
import { MLService } from 'ml-uservices';
export declare class ProductService extends MLService {
    updateCategories(): Observable<FacetValue<string>[]>;
}
