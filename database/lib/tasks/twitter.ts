import {task, FrequencyType} from 'ml-uservices'
import {twitterSpec} from '../remoteServiceProxies'
import {TwitterService, Customer} from 'ml-retail-demo-common'
import {inject, wired} from 'tschuss'

@wired(__dirname)
export class TwitterTask {
  private twitterService: TwitterService

  constructor(@inject() twitterService?: TwitterService) {
    this.twitterService = twitterService
  }

  @task({
    type: FrequencyType.MINUTES,
    frequency: 1
  })
  fetchTweets() {
    var sem = require('/MarkLogic/semantics.xqy')
    declareUpdate()

    xdmp.directory('/customers/').toArray().forEach(function(node){
      let customer = <Customer>cts.doc(xdmp.nodeUri(node)).root
      this.twitterService.getTweets(customer.twitterId, 'marklogic').then(function(tweets){
        if (tweets.length > 0) {
          for (let i = 0; i < tweets.length; i++) {
            let tweet = tweets[i]
            let uri = `/tweets/${tweet.id}.json`
            if (!cts.doc(uri)) {
              xdmp.documentInsert(uri, tweet)
              sem.rdfInsert(
                sem.triple(
                  sem.iri(`http://megastore.com/customers/${customer.username}.json`),
  	              sem.iri('http://megastore.com/tweeted'),
                  sem.iri(`http://megastore.com/${uri}`)))
            }
          }
        }
      })
    })
  }
}
