import { Pipeline, Document } from 'ml-admin';
import { MLProduct } from '../models/product';
export declare class PIMPipeline implements Pipeline<any, MLProduct> {
    transform(input: Document<any>): Document<MLProduct>[];
}
