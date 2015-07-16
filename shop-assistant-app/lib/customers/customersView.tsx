import * as b from 'react-bootstrap'
import {Customers} from './customersComponent'
import * as React from 'react'
// TODO: Hack to prevent browserfiy removing React. Investigate correct solution
let r = React

export function customersView(context:Customers) {
  return <div className="container">
    <b.Navbar brand='MegaStore Shop Assistant App' inverse toggleNavKey={0}>
      <b.Nav right eventKey={0}> {/* This is the eventKey referenced */}
        <b.NavItem eventKey={1} href='#'>Logout</b.NavItem>
      </b.Nav>
    </b.Navbar>

    <b.Row>
      <b.Col xs={12}>
        <h1>High Value Customers</h1>
      </b.Col>
      <b.Col xs={12}>
      {context.props.customers.map(result=>
        <b.Panel>
          <h3>{result.name.firstName + ' ' +result.name.lastName}</h3>
          Location: {result.currentLocation}
        </b.Panel>
      )}
      </b.Col>
    </b.Row>
  </div>
}
