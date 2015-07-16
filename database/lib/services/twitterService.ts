import {Observable} from 'uservices'
import {FacetValue} from 'marklogic'
import {mlService, mlEvent, MLService, Doc} from 'ml-uservices'

@mlService()
export class TwitterService extends MLService {
  @mlEvent({
    scope: '/tweets/'
  })
  updateTweets():Observable<boolean> {
    return this.observableFactory().map(function(value: Doc<any>){
      declareUpdate()
      xdmp.log(value.uri)
      var sem = require('/MarkLogic/semantics.xqy')
xdmp.log('CHECK 0')
      if (cts.search(cts.andQuery([cts.wordQuery(['awesome', 'great', 'brilliant', 'fantastic', 'amazing']), cts.documentQuery(value.uri)]))) {
        xdmp.log('CHECK 1')
        sem.rdfInsert(
          sem.triple(
            sem.iri(`http://megastore.com${value.uri}`),
            sem.iri('http://megastore.com/sentiment'),
            sem.iri('http://megastore.com/positiveSentiment')))
          xdmp.log('CHECK 2')
      }
      return true
    })
  }
}
