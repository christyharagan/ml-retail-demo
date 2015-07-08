import * as b from 'react-bootstrap'
import {App, PrimaryAppState} from './appComponent'
import * as login from '../login/loginComponent'
import * as productPage from '../productPage/productPageComponent'
import * as React from 'react'
// TODO: Hack to prevent browserfiy removing React. Investigate correct solution
let r = React

export function appView(context: App) {
  return context.state.primaryState === PrimaryAppState.LOGIN ?
    <login.Login onLogin={context.onLogin.bind(context)} onRegister={context.onRegister.bind(context)}/> :
    <productPage.ProductPage onLogout={context.onLogout.bind(context)} onError={context.props.onError.bind(context)} productService={context.props.productService} categories={context.props.categories}/>
}
