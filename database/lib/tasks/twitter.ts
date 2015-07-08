import {task, FrequencyType} from 'ml-admin'
import {twitterSpec} from '../remoteServiceProxies'
import {TwitterService, Customer} from 'ml-retail-demo-common'

export class Twitter {
  @task({
    type: FrequencyType.MINUTES,
    frequency: 5,
    inject: twitterSpec()
  })
  fetchTweets(twitterService: TwitterService) {
    declareUpdate()
    var sem = require('/MarkLogic/semantics.xqy')

    xdmp.directory('/customers/').toArray().forEach(function(node){
      let customer = <Customer>cts.doc(xdmp.nodeUri(node)).root
      twitterService.getTweets(customer.twitterId, 'marklogic').then(function(tweets){
        if (tweets.length > 0) {
          xdmp.documentInsert(`/tweets/${customer.username}`, tweets)
          sem.rdfInsert(
            sem.triple(
              sem.iri(`http://megastore.com/customer/${customer.username}`),
	            sem.iri('http://megastore.com/tweeted'),
              sem.iri(`http://megastore.com/tweets/${customer.username}`)))
          sem.rdfInsert(
            sem.triple(
              sem.iri(`http://megastore.com/tweets/${customer.username}`)),
              sem.iri('http://megastore.com/sentiment'),
              sem.iri('http://megastore.com/positiveSentiment'))
        }
      })
    })
  }
}
