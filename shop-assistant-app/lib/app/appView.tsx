import * as b from 'react-bootstrap'
import {App, PrimaryAppState} from './appComponent'
import * as customers from '../customers/customersComponent'
import * as location from '../location/locationComponent'
import * as React from 'react'
// TODO: Hack to prevent browserfiy removing React. Investigate correct solution
let r = React

export function appView(context: App) {
  return context.state.primaryState === PrimaryAppState.MAP ?
    <location.Location onSelect={context.onMap.bind(context)}/> :
    <customers.Customers customers={context.state.customers}/>
}
