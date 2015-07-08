import {Observable} from 'uservices'
import {FacetValue} from 'marklogic'
import {mlService, mlEvent, MLService} from 'ml-uservices'

@mlService()
export class TwitterService extends MLService {
  @mlEvent({
    scope: '/tweets/'
  })
  updateTweets():Observable<boolean> {
    return this.observableFactory().map(function(value: any){
      return true
    })
  }
}
