import * as React from 'react'
import {StoreService, Customer} from 'ml-retail-demo-common'
import {Observable} from 'rx'
import {Driver} from '@cycle/core'

import {appView} from './appView'

export interface AppProps {
  storeService: StoreService

  onError(e): void
}

export enum PrimaryAppState {
  MAP,
  CUSTOMERS
}

export interface AppState {
  primaryState?: PrimaryAppState
  customers?: Customer[]
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props)
    this.state = {
      primaryState: PrimaryAppState.MAP,
      customers:[]
    } as AppState
  }

  onMap(lat:number, long:number) {
    let self = this
    self.setState({
      primaryState: PrimaryAppState.CUSTOMERS
    })
    this.props.storeService.getHighValueCustomers(lat, long).subscribe(function(customers){
      self.setState({
        customers: customers
      })
    })
  }

  render() {
    return appView(this)
  }
}

export interface Services {
  store: StoreService
}

export interface AppDrivers {
  services: Driver<Services>
}

export function app(drivers:AppDrivers){
  return {
    DOM: Observable.just(function() {
      return drivers.services.get().map(function(services){
        return <App storeService={services.store} onError={e=>console.log(e)} />
      })
    })
  }
}
