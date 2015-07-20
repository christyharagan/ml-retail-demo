import {Customer} from 'ml-retail-demo-common'
import * as React from 'react'
import {loginView} from './loginView'
import * as b from 'react-bootstrap'

const ENTER_KEY = 13

export interface LoginProps {
  onLogin(username:string):void
  onRegister(customer:Customer)
}

export interface LoginState {
  loginDisabled?: boolean
  loginUsername?: string

  registerDisabled?: boolean
  registerFirstName?: string
  registerLastName?: string
  registerTwitterId?: string
  registerUsername?: string
}

export class Login extends React.Component<LoginProps, LoginState> {
  constructor(props) {
    super(props)
    this.state = {
      loginDisabled: true,
      registerDisabled: true,
      loginUsername: '',
      registerFirstName: '',
      registerLastName: '',
      registerTwitterId: '',
      registerUsername: ''
    } as LoginState
  }

  loginOnClick(e:Event) {
    if (!this.state.loginDisabled) {
      this.props.onLogin(this.state.loginUsername)
    }
    e.stopPropagation()
    e.preventDefault()
  }

  registerOnClick(e:Event) {
    if (!this.state.registerDisabled) {
      this.props.onRegister(<Customer>{
        name: {
          firstName: this.state.registerFirstName,
          lastName: this.state.registerLastName
        },
        loggedIn: true,
        username: this.state.registerUsername,
        twitterId: this.state.registerTwitterId
      })
    }
    e.stopPropagation()
    e.preventDefault()
  }

  loginUsernameOnKeyUp(ev:KeyboardEvent) {
    if (ev.keyCode === ENTER_KEY) {
      this.loginOnClick(ev)
    } else {
      let loginUsername = (<b.Input>this.refs['loginUsername']).getValue().trim()
      this.setState({
        loginDisabled: loginUsername.length === 0,
        loginUsername: loginUsername
      })
    }
  }

  registerFirstNameOnKeyUp(ev:KeyboardEvent) {
    if (ev.keyCode === ENTER_KEY) {
      this.registerOnClick(ev)
    } else {
      let registerFirstName = (<b.Input>this.refs['registerFirstName']).getValue().trim()
      this.setState({
        registerDisabled: registerFirstName.length === 0 || this.state.registerLastName.length === 0 || this.state.registerUsername.length === 0 || this.state.registerTwitterId.length === 0,
        registerFirstName: registerFirstName
      })
    }
  }

  registerLastNameOnKeyUp(ev:KeyboardEvent) {
    if (ev.keyCode === ENTER_KEY) {
      this.registerOnClick(ev)
    } else {
      let registerLastName = (<b.Input>this.refs['registerLastName']).getValue().trim()
      this.setState({
        registerDisabled: this.state.registerFirstName.length === 0 || registerLastName.length === 0 || this.state.registerUsername.length === 0 || this.state.registerUsername.length === 0,
        registerLastName: registerLastName
      })
    }
  }

  registerUsernameOnKeyUp(ev:KeyboardEvent) {
    if (ev.keyCode === ENTER_KEY) {
      this.registerOnClick(ev)
    } else {
      let registerUsername = (<b.Input>this.refs['registerUsername']).getValue().trim()
      this.setState({
        registerDisabled: this.state.registerFirstName.length === 0 || this.state.registerLastName.length === 0 || registerUsername.length === 0 || this.state.registerTwitterId.length === 0,
        registerUsername: registerUsername
      })
    }
  }

  registerTwitterIdOnKeyUp(ev:KeyboardEvent) {
    if (ev.keyCode === ENTER_KEY) {
      this.registerOnClick(ev)
    } else {
      let registerTwitterId = (<b.Input>this.refs['registerTwitterId']).getValue().trim()
      this.setState({
        registerDisabled: this.state.registerFirstName.length === 0 || this.state.registerLastName.length === 0 || this.state.registerUsername.length === 0 || registerTwitterId.length === 0,
        registerTwitterId: registerTwitterId
      })
    }
  }

  render() {
    return loginView(this)
  }
}
