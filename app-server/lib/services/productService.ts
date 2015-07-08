import {Product, ProductService, SearchResult} from 'ml-retail-demo-common'
import {FacetValue as FacetValueWithCount, Match, Client} from 'marklogic'
import {IObservable, Observable} from 'rx'
import {search, getFacetValues, FacetValue} from 'ml-admin'
import {ProductService as MLProductService, CategoriesFacet} from 'ml-retail-demo-database'

export class ProductServiceImpl implements ProductService {
  private mlProductService:MLProductService
  private client:Client

  constructor(client:Client, mlProductService:MLProductService) {
    this.client = client
    this.mlProductService = mlProductService
  }

  searchProducts(query:string, facetValues: FacetValueWithCount<any>[]):Promise<SearchResult[]> {
    let fvs: FacetValue<any>[]
    if (facetValues) {
      fvs = facetValues.map(function(facetValue){
        return <FacetValue<any>> {
          value: facetValue.value,
          facet: CategoriesFacet
        }
      })
    }

    return search(this.client, {
      query: query,
      facetValues: fvs
      }, {highlights:true, content:true}).then(function(results){
        return results.results.map(function(result){
          return <SearchResult>{
            product: <Product> result.content,
            match: result.matches[0]
          }
        })
      })
  }

  getCategories():Observable<FacetValueWithCount<string>[]> {
    let promise:Promise<FacetValueWithCount<string>[]> = getFacetValues(this.client, CategoriesFacet, '/products')
    let firstResult:Observable<FacetValueWithCount<string>[]> = Observable.fromPromise(promise)
    let restOfPromises = <Observable<FacetValueWithCount<string>[]>>this.mlProductService.updateCategories()

    return firstResult.concat(restOfPromises)
  }
}
