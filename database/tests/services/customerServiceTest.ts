require('should')
require('should-promised')

import {createClient} from '../../lib/createClient'
import {customerServiceProxy} from '../../lib/remoteServiceProxies'
import {createTestServer} from '../testServer'
import {Customer} from 'ml-retail-demo-common'

let customer: Customer = {
  username: 'christy',
  twitterId:'christyharagan',
  name: {
    firstName: 'Christy',
    lastName: 'Haragan'
  },
  currentLocation:'500 500',
  loggedIn:false
}

export function testRegisterAndLogin() {
  let [server, cb] = createTestServer()
  let customerProxy = customerServiceProxy(createClient(), server)

  return cb().then(function(){
//    return customerProxy.register(customer)

    return customerProxy.login('christy').then(function(v):Promise<Boolean>{
      throw 'Customer christy should not exist'
    }, function(e){
      return customerProxy.register(customer)
    }).then(function(){
      return customerProxy.login('christy')
    }).then(function(result){
      result.should.be.true
      return customerProxy.login('christy')
    }).then(function(result) {
      result.should.be.false
      return customerProxy.logout('christy')
    }).then(function(result){
      result.should.be.true
      return true
    })
  })
}

describe('getLastRestartTimestamp', function() {
  it('should return a valid timestamp', function(){
    return testRegisterAndLogin().should.finally.be.true
  })
})
