import * as React from 'react'
import {CustomerService, ProductService, Customer} from 'ml-retail-demo-common'
import {Observable} from 'rx'
import {Driver} from '@cycle/core'
import {FacetValue as FacetValueWithCount} from 'marklogic'
import {FacetValue} from 'ml-admin'
import {UpdateLocation} from '../geolocation/updateLocation'

import {appView} from './appView'

export interface AppProps {
  customerService: CustomerService

  productService: ProductService

  categories?: FacetValue<any>[]

  onError(e): void
}

export enum PrimaryAppState {
  LOGIN,
  PRODUCT
}

export interface AppState {
  primaryState: PrimaryAppState
  username?: string
}

export class App extends React.Component<AppProps, AppState> {
  private updateLocation:UpdateLocation

  constructor(props) {
    super(props)
    this.state = {
      primaryState: PrimaryAppState.LOGIN
    } as AppState
    this.updateLocation = new UpdateLocation(this.props.customerService, 60000)
  }

  onLogin(username:string) {
    let self = this
    this.props.customerService.login(username).then(function(success){
      if (success) {
        self.setState({
          primaryState: PrimaryAppState.PRODUCT,
          username: username
        })
        self.updateLocation.login(username)
      }
    }, function(error){
      self.props.onError(error)
    })
  }
  onRegister(customer:Customer) {
    let self = this
    this.props.customerService.register(customer).then(function(success){
      if (success) {
        self.setState({
          primaryState: PrimaryAppState.PRODUCT,
          username: customer.username
        })
      }
    }, function(error){
      self.props.onError(error)
    })
  }
  onLogout() {
    let self = this
    this.props.customerService.logout(this.state.username).then(function(success){
      if (success) {
        self.setState({
          primaryState: PrimaryAppState.LOGIN,
          username: null
        })
        self.updateLocation.logout()
      }
    }, function(error){
      self.props.onError(error)
    })
  }

  render() {
    return appView(this)
  }
}

export interface Services {
  product: ProductService
  customer: CustomerService
}

export interface AppDrivers {
  services: Driver<Services>
}

export function app(drivers:AppDrivers){
  return {
    DOM: Observable.just(function() {
      return drivers.services.get().flatMap(function(services){
        return services.product.getCategories()
      }).combineLatest(drivers.services.get(), function(categories, services){
        return <App categories={categories} customerService={services.customer} productService={services.product} onError={e=>console.log(e)} />
      })
    })
  }
}
