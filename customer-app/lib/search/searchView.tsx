import * as b from 'react-bootstrap'
import {Search} from './searchComponent'
import * as React from 'react'
// TODO: Hack to prevent browserfiy removing React. Investigate correct solution
let r = React

export function searchView(context: Search) {
  return <b.Input
    type='text'
    placeholder='Enter text'
    label='Search for products'
    groupClassName='group-class'
    labelClassName='label-class'
    ref='input'
    onKeyUp={context.onKeyUp.bind(context)}
  />
}
