import * as React from 'react'
import * as b from 'react-bootstrap'

import {searchView} from './searchView'

const ENTER_KEY = 13

export interface SearchProps {
  onSearch(query:string):void
}

export interface SearchState {
}

export class Search extends React.Component<SearchProps, SearchState> {
  onKeyUp(ev:KeyboardEvent) {
    if (ev.keyCode === ENTER_KEY) {
      this.props.onSearch((<b.Input>this.refs['input']).getValue())
    }
  }

  render() {
    return searchView(this)
  }
}
