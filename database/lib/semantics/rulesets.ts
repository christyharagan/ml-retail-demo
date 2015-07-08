import {ruleSet} from 'ml-admin'
import {rule, variable, prefix} from 'speckle'

export class RuleSets {
  @ruleSet({
    path: '/rules/twitter.rules'
  })
  twitterRuleset() {
    let megaStore = prefix('ms', 'http://megastore.com/')
    let customer = variable('customer')
    let tweet = variable('tweet')
    rule('isHighValueCustomer')
      .when(customer, megaStore.uri('tweeted'), tweet)
      .and(tweet, megaStore.uri('sentiment'), megaStore.uri('positiveSentiment'))
      .then(customer, megaStore.uri('is'), megaStore.uri('highValue'))
  }
}
