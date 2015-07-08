import {geoIndexed, GeoIndex} from 'ml-admin'
import {Customer, Name} from 'ml-retail-demo-common'

export class CustomerLocation extends GeoIndex {
}

export class MLCustomer implements Customer {
  username: string

  name: Name

  twitterId: string

  loggedIn: boolean

  @geoIndexed({
    class: CustomerLocation
  })
  currentLocation: string
}
