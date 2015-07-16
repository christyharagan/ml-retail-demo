import {ServerSpec, DatabaseSpec, ForestSpec, mlDeploy, contentDatabase, triggersDatabase, modulesDatabase, schemaDatabase, ruleSet} from 'ml-admin'
import {Config} from 'ml-project'
//import {RuleSets} from './semantics/rulesets'
//import {ruleSet} from 'ml-admin'
import {rule, variable, prefix} from 'speckle'

@mlDeploy()
export class RetailDemo {
  constructor(config:Config) {
    this.config = config
  }

  config:Config

  get server():ServerSpec {
    return {
      name: 'retail-demo',
      host: this.config.database.host,
      port: this.config.database.httpPort
    }
  }

  @contentDatabase()
  contentDatabase:DatabaseSpec = {
    name: 'retail-demo-content',
    triples: true,
    defaultRulesets: ['/rules/twitter.rules']
  }

  @triggersDatabase()
  triggersDatabase: DatabaseSpec = {
    name: 'retail-demo-triggers'
  }

  @modulesDatabase()
  modulesDatabase: DatabaseSpec = {
    name: 'retail-demo-modules'
  }

  @schemaDatabase()
  schemaDatabase: DatabaseSpec = {
    name: 'retail-demo-schema'
  }

  @ruleSet({
    path: '/rules/twitter.rules'
  })
  customerRuleSet():string {
    let megaStore = prefix('ms', 'http://megastore.com/')
    let customer = variable('customer')
    let tweet = variable('tweet')
    return rule('isHighValueCustomer')
      .when(customer, megaStore.uri('tweeted'), tweet)
      .and(tweet, megaStore.uri('sentiment'), megaStore.uri('positiveSentiment'))
      .then(customer, megaStore.uri('is'), megaStore.uri('highValue')).toSparql()
  }
//  ruleSets:RuleSets = new RuleSets()
}
