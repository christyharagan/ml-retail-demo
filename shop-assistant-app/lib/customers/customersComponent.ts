import * as React from 'react'
import * as b from 'react-bootstrap'
import {Customer} from 'ml-retail-demo-common'

import {customersView} from './customersView'

export interface CustomersProps {
  customers: Customer[]
}

export interface CustomersState {
}

export class Customers extends React.Component<CustomersProps, CustomersState> {
  render() {
    return customersView(this)
  }
}
