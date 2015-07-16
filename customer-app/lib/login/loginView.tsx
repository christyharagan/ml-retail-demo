import * as b from 'react-bootstrap'
import {Login} from './loginComponent'
import * as React from 'react'
// TODO: Hack to prevent browserfiy removing React. Investigate correct solution
let r = React

export function loginView(context:Login) {
  return <div>
  <b.Navbar brand='MegaStore Customer App' inverse toggleNavKey={0}>
    <b.Nav right eventKey={0}> {/* This is the eventKey referenced */}
    </b.Nav>
  </b.Navbar>

  <b.Grid>
    <b.Row className='show-grid'>
      <b.Col xs={12}>
        <b.Panel>
          <b.Input type="text" placeholder="Enter username" label="Username"groupClassName='group-class' labelClassName='label-class' ref="loginUsername" onKeyUp={context.loginUsernameOnKeyUp.bind(context)} />
          <b.ButtonInput type="submit" value="Login" bsSize="large" disabled={context.state.loginDisabled} onClick={context.loginOnClick.bind(context)} />
        </b.Panel>
      </b.Col>
    </b.Row>
    <b.Row className='show-grid'>
      <b.Col xs={12}>
        <b.Panel>
          <b.Input type="text" placeholder="Enter first name" label="First Name"groupClassName='group-class' labelClassName='label-class' ref="registerFirstName" onKeyUp={context.registerFirstNameOnKeyUp.bind(context)} />
          <b.Input type="text" placeholder="Enter last name" label="Last Name"groupClassName='group-class' labelClassName='label-class' ref="registerLastName" onKeyUp={context.registerLastNameOnKeyUp.bind(context)} />
          <b.Input type="text" placeholder="Enter twitter id" label="Twitter Id"groupClassName='group-class' labelClassName='label-class' ref="registerTwitterId" onKeyUp={context.registerTwitterIdOnKeyUp.bind(context)} />
          <b.Input type="text" placeholder="Enter username" label="Username"groupClassName='group-class' labelClassName='label-class' ref="registerUsername" onKeyUp={context.registerUsernameOnKeyUp.bind(context)} />
          <b.ButtonInput type="submit" value="Register" bsSize="large" disabled={context.state.registerDisabled} onClick={context.registerOnClick.bind(context)} />
        </b.Panel>
      </b.Col>
    </b.Row>
  </b.Grid>
  </div>
}
