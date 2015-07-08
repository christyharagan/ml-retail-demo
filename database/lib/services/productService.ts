import {Observable} from 'uservices'
import {FacetValue} from 'marklogic'
import {mlService, mlEvent, MLService} from 'ml-uservices'

@mlService()
export class ProductService extends MLService {
  @mlEvent({
    scope: '/products/'
  })
  updateCategories():Observable<FacetValue<string>[]> {
    return this.observableFactory().map(function(value: any){
      let x = cts.values(cts.pathReference('/categories')).toArray()
      let arr:FacetValue<string>[] = []
      for (let i = 0; i < x.length; i++) {
        let value = x[i]
        arr.push({name: value, value: value, count: cts.frequency(value)})
      }

      return arr
    })
  }
}
