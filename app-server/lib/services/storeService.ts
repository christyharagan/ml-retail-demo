import {StoreService, Customer} from 'ml-retail-demo-common'
import {search, getFacetValues, FacetValue} from 'ml-admin'
import {Client} from 'marklogic'
import {select, variable, prefix} from 'speckle'
import {CustomerLocation, TwitterService} from 'ml-retail-demo-database'
import {Observable} from 'rx'

export class StoreServiceImpl implements StoreService {
  private client:Client
  private mlTwitterService: TwitterService

  constructor(client:Client, mlTwitterService: TwitterService) {
    this.client = client
    this.mlTwitterService = mlTwitterService
  }
  getHighValueCustomers(lat: number, long: number): Observable<Customer[]> {
    let customer = variable('customer')
    let ms = prefix('ms', 'http://megastore.com/')

    let tweetObservable = <Observable<any>>this.mlTwitterService.updateTweets()
    let client = this.client

    function doSearch() {
      return search(client, {
        semanticQuery: {
          query: select(customer).where(customer, ms.uri('is'), ms.uri('highValue')),ruleSet: '/rules/twitter.rules', resultPrefix: 'http://megastore.com'
        },
        geoValue: {
          lat: lat,
          long: long,
          geoIndex: CustomerLocation,
          radius: 100
        }
      }, {content: true}).then(function(searchResults){
        return searchResults.results.map(function(result){
          return <Customer> result.content
        })
      })
    }

    return Observable.concat(Observable.fromPromise(doSearch()), tweetObservable.flatMap(function(tweet){
      return doSearch()
    }))
  }
}
