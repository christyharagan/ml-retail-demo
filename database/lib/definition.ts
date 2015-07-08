import {ServerSpec, DatabaseSpec, ForestSpec, mlDeploy, contentDatabase, triggersDatabase, modulesDatabase, schemaDatabase} from 'ml-admin'
import {Config} from 'ml-project'

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
}
