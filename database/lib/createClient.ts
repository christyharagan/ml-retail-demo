import {Config} from 'ml-project'
import {createAdminClient} from 'ml-admin'
import {Client} from 'marklogic'

let config = <Config> require('../../../config.json')

export function createClient():Client {
  return createAdminClient({
    port: config.database.httpPort,
    host: config.database.host,
    password: config.database.adminPassword,
    user: config.database.adminUser,
    database: config.database.database
  })
}
