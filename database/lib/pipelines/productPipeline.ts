import {cpf, Pipeline, Document} from 'ml-admin'
import {MLProduct} from '../models/product'

@cpf({
  scope: '/pim/'
})
export class PIMPipeline implements Pipeline<any, MLProduct> {
  transform(input:Document<any>):Document<MLProduct>[] {
    // TODO
    return []
  }
}
