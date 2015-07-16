import {StoreService, Customer} from 'ml-retail-demo-common'
import {search, getFacetValues, FacetValue} from 'ml-admin'
import {Client} from 'marklogic'
import {select, variable, prefix} from 'speckle'
import {CustomerLocation, TwitterService} from 'ml-retail-demo-database'
import {Observable} from 'rx'
import {inject, wired} from 'tschuss'

@wired(__dirname)
export class StoreServiceImpl implements StoreService {
  private client:Client
  private mlTwitterService: TwitterService

  constructor(client:Client, @inject() mlTwitterService?) {
    this.client = client
    this.mlTwitterService = mlTwitterService
  }
  getHighValueCustomers(lat: number, long: number): Observable<Customer[]> {
    let customer = variable('customer')
    let tweet = variable('tweet')
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
          radius: 500
        }
      }, {content: true}).then(function(searchResults){
        return searchResults.results.map(function(result){
          return <Customer> result.content
        })
      })

        /*console.log(searchResults)
        let customers = searchResults.results.map(function(result){
          let hvCustomer = <Customer> result.content
          return search(client, {
            semanticQuery: {
              query: select(tweet)
                .where(customer, ms.uri('tweeted'), tweet)
                .and(tweet, ms.uri('sentiment'), ms.uri('positiveSentiment')),
              resultPrefix: 'http://megastore.com'
            }
          },{
            content: true
          }).then(function(results){
            return <HighValueCustomer>{
              customer: hvCustomer,
              tweet: <Tweet> results.results[0].content
            }
          })
        })
        return Promise.all(customers)
      })*/
    }

    return Observable.concat(Observable.fromPromise(doSearch()), tweetObservable.flatMap(function(tweet){
      return doSearch()
    }))
  }
}
