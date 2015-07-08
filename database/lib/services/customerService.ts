import {mlService, mlMethod, resolve, reject} from 'ml-uservices'
import {CustomerService, Customer} from 'ml-retail-demo-common'

function getUri(username:string) {
  return `/customers/${username}.json`
}

export const CUSTOMER_NOT_FOUND_ERROR = 'Customer not found'

@mlService()
export class CustomerServiceML implements CustomerService {
  @mlMethod({
    method: 'put'
  })
  login(username: string): Promise<boolean> {
    let uri = getUri(username)
    if (!cts.doc(uri)) {
      return reject(CUSTOMER_NOT_FOUND_ERROR)
    } else {
      let customer = <Customer> cts.doc(uri).toObject()
      if (!customer.loggedIn) {
        customer.loggedIn = true
        xdmp.documentInsert(uri, customer)
      }

      return resolve(true)
    }
  }

  @mlMethod({
    method: 'put'
  })
  logout(username: string): Promise<boolean> {
    let uri = getUri(username)
    if (!cts.doc(uri)) {
      return reject(CUSTOMER_NOT_FOUND_ERROR)
    } else {
      let customer = <Customer> cts.doc(uri).toObject()
      if (customer.loggedIn) {
        customer.loggedIn = false
        xdmp.documentInsert(uri, customer)
      }

      return resolve(true)
    }
  }

  @mlMethod({
    method: 'put'
  })
  register(customer:Customer): Promise<boolean> {
    let uri = getUri(customer.username)
    if (cts.doc(uri)) {
      return resolve(false)
    } else {
      xdmp.documentInsert(uri, customer)
      return resolve(true)
    }
  }

  @mlMethod({
    method: 'put'
  })
  updateLocation(username: string, latLong: string): Promise<any> {
    let uri = getUri(username)
    if (!cts.doc(uri)) {
      return reject(CUSTOMER_NOT_FOUND_ERROR)
    } else {
      let customer = <Customer> cts.doc(uri).toObject()
      customer.currentLocation = latLong

      xdmp.documentInsert(uri, customer)

      return resolve(true)
    }
  }
}
