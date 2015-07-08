import * as React from 'react'
import * as b from 'react-bootstrap'
import {SearchResult, Product} from 'ml-retail-demo-common'

import {searchResultsView} from './searchResultsView'

export interface SearchResultsProps {
  results: SearchResult[]

  onSelect(product:Product):void
}

export interface SearchResultsState {
}

export class SearchResults extends React.Component<SearchResultsProps, SearchResultsState> {
  render() {
    return searchResultsView(this)
  }
}
